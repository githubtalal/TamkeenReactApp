import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArticlesServices } from '../Services/ArticlesServices'
import Loading from '../Components/Loading'
import { Container, Row, Col } from 'react-bootstrap'
//import { Bounce, toast, ToastContainer } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';
import { IoMdCloseCircle } from "react-icons/io";
import { CategoriesServices } from '../Services/CategoriesServices'
import { AuthService } from '../Services/AuthService'

const EditArticle = () => {
    const notify = () => toast.success('Article Updated successfully', {
        duration: 4000,
        // Styling
        style: {
            color: '#5f3fadff',
            fontSize: '20px'
        },
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#463c6dff',
            secondary: '#bdb7cdff',
            height: '60px',
            width: '60px'
        }
    });

    const { aid } = useParams()
    const [selectedImage, setSelectedImage] = useState(null);
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [previewUrl, setPreviewUrl] = useState()

    const [isLoadingSubmit, setLoadingSubmit] = useState(false)

    const [selectedGallaryImages, setGallaryImages] = useState([])

    const [articleDetails, setArticleDetails] = useState({
        "type": [{
            "target_id": "blog"
        }],
        "body": [{
            "value": "",
            "format": "full_html"
        }],
        "field_image": [{
            "target_id": "",
            "url": ""
        }],
        "field_category": [{
            "target_id": ""
        }],
        "field_gallery": [],
        "field_tags": []
    })
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('theUserData'))
     if (!userInfo) {
            return <Navigate to="/" replace />
        }
    const loadArticleDetails = () => {
        setLoading(true)
        ArticlesServices.getArticleDetails({
            'articleId': aid,
            'credentials': userInfo.ps
        })
            .then(data => {
                setPreviewUrl(data.field_image[0] ? data.field_image[0].url : "")
                setArticleDetails({
                    ...articleDetails,
                    "body": [{
                        "value": data.body[0] ? data.body[0].value : ""
                    }],
                    "title": [{
                        "value": data.title[0] ? data.title[0].value : ""
                    }],
                    "body": [{
                        "value": data.body[0] ? data.body[0].value : ""
                    }],
                    "field_image": [{
                        "target_id": data.field_image[0] ? data.field_image[0].target_id : ""
                    }],
                    "field_category": [{
                        "target_id": data.field_category[0] ? data.field_category[0].target_id : ""
                    }],
                    "field_tags": data.field_tags.map(tag => { return { "target_id": tag.target_id } }),
                    "field_gallery": data.field_gallery
                })
                setLoading(false)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done'))
    }

    const loadCategories = () => {
        CategoriesServices.getCategories()
            .then(data => {
                setCategories(data)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Categories Fetched Successfully'))
    }

    const loadTags = () => {
        ArticlesServices.getTags()
            .then(data => {
                setTags(data)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done'))
    }


    useEffect(() => {
        loadArticleDetails()
        loadCategories()
        loadTags()
    }, [])

    const callAPI = () => {
        setLoadingSubmit(true)
        // fetch session token
        if (selectedImage) {
            AuthService.getSessionToken()
                .then(csrfToken => {
                    ArticlesServices.uploadArticleImage({
                        "sessionToken": csrfToken,
                        "file_name": selectedImage.name,
                        "credentials": userInfo.ps,
                        "file": selectedImage
                    })
                        .then(data => {
                            const selectedImageId = data.fid
                            if (selectedGallaryImages) {
                                uploadGallery(csrfToken, selectedImageId)
                            } else {
                                updateArticle(csrfToken, selectedImageId)
                            }
                        })
                        .catch(error => console.log(error))
                        .finally(() => {
                            console.log('Done whole operation')

                        })
                })
                .catch(error => console.log(error)).finally(() => console.log('Done fetching token'))

        } else {
            // fetch session token
            AuthService.getSessionToken()
                .then(csrfToken => {
                    if (selectedGallaryImages) {
                        uploadGallery(csrfToken)
                    } else {
                        updateArticle(csrfToken)
                    }
                })
        }
    }

    const uploadGallery = async (sessionToken, bannerId) => {
        const uploadPromises = selectedGallaryImages.map(image => {
            return ArticlesServices.uploadGallaryImages({
                "sessionToken": sessionToken,
                "file_name": image.name,
                "credentials": userInfo.ps,
                "file": image
            })
        })

        const galleryImages = await Promise.all(uploadPromises)
            .then(result => {
                return result.map(file => {
                    return { "target_id": file.fid[0].value }
                })
            })


        await ArticlesServices.updateArticle({
            'articleId': aid,
            "csrf_token": sessionToken,
            "credentials": userInfo.ps,
            "type": articleDetails.type,
            "title": articleDetails.title,
            "body": articleDetails.body,
            "field_category": articleDetails.field_category,
            "field_image": bannerId ? [{ "target_id": bannerId }] : articleDetails.field_image,
            "field_gallery": galleryImages,
            "field_tags": articleDetails.field_tags
        })
            .then(data => {
                setLoadingSubmit(false)
                notify()
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Article updated Successfully'))

    }


    const updateArticle = (csrf_token, bannerId) => {
        ArticlesServices.updateArticle({
            'articleId': aid,
            "csrf_token": csrf_token,
            "credentials": userInfo.ps,
            "type": articleDetails.type,
            "title": articleDetails.title,
            "body": articleDetails.body,
            "field_category": articleDetails.field_category,
            "field_image": bannerId ? [{ "target_id": bannerId }] : articleDetails.field_image,
            "field_tags": articleDetails.field_tags
        })
            .then(data => {
                setLoadingSubmit(false)
                notify()
            })
            .catch(error => console.log(error))
            .finally(() => {
                console.log("Done")
            })
    }


    return (
        <Container style={{ marginTop: '100px', padding: '50px 0' }} className='article-details'>
            {
                (isLoading) ?
                    <Loading /> :
                    <>
                        <center className='mb-4'>
                            <h1 className='text text-primary'>Edit Article</h1>
                        </center>
                        <form
                            onSubmit={e => {
                                e.preventDefault()
                                callAPI()
                            }}
                        >
                            <Row>
                                <Col>
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className='form-control' id="title" value={articleDetails.title[0].value} onInput={e =>
                                        setArticleDetails({
                                            ...articleDetails,
                                            'title': [{
                                                "value": e.target.value
                                            }]
                                        })
                                    } />
                                    {
                                        (articleDetails.title[0].value.length > 0 && articleDetails.title[0].value.length < 2) ?
                                            <p className='text-text-danger'>Article title must have at least 2 characters</p>
                                            :
                                            ""
                                    }
                                </Col>
                                <Col>
                                    <label htmlFor="category">Select Category</label>
                                    <select name="category" id="category" className='form-select' value={articleDetails.field_category[0].target_id} onChange={e => setArticleDetails({
                                        ...articleDetails,
                                        "field_category": [{
                                            "target_id": e.target.value
                                        }]
                                    })}>
                                        <option value="">...</option>
                                        {
                                            categories.map(category => (
                                                <option value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                </Col>
                            </Row>
                            <Row className='mt-4'>

                                <Col>
                                    <label htmlFor="body">Body</label>
                                    <textarea name="body" id="body" className='form-control' cols="15" rows="7" placeholder='Body ..' value={articleDetails.body[0].value} onInput={
                                        e => setArticleDetails({
                                            ...articleDetails,
                                            "body": [{
                                                "value": e.target.value
                                            }]
                                        })
                                    } />
                                    {
                                        (articleDetails.body[0].value.length > 0 && articleDetails.body[0].value.length < 10) ?
                                            <p className='text text-danger mt-2'>article body must have at least 10 characters</p>
                                            :
                                            ''
                                    }
                                </Col>
                                <Col>
                                    <label>Choose Article Tags ...</label>
                                    <br />
                                    {
                                        tags.map(tag => (
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value={`tag_${tag.id}`} checked={articleDetails.field_tags.some(anyTag => anyTag.target_id === parseInt(tag.id))} onChange={e => {

                                                    setArticleDetails(prev => {
                                                        if (e.target.checked) {
                                                            console.log('checked case')
                                                            return {
                                                                ...prev,
                                                                "field_tags": [...prev.field_tags, { "target_id": parseInt(e.target.value.split('_')[1]) }]
                                                            }

                                                        } else {
                                                            console.log('uncheked case')
                                                            return {
                                                                ...prev,
                                                                "field_tags": [...prev.field_tags.filter(articleTag => articleTag.target_id !== parseInt(e.target.value.split('_')[1]))]
                                                            }
                                                        }
                                                    })
                                                }}></input>
                                                <label class="form-check-label" for="inlineCheckbox1">{tag.name}</label>
                                            </div>
                                        ))
                                    }
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col>
                                    <label htmlFor="articleImage">Upload Image</label>
                                    <input type="file" name="" id="articleImage" className='form-control' accept='image/jpeg image/png' onChange={(e) => {
                                        setSelectedImage(e.target.files[0])
                                    }} />
                                    {(selectedImage || previewUrl) && (
                                        <div className='position-relative'>
                                            {/* Display the selected image */}
                                            <img
                                                alt="not found"
                                                width={"180px"}
                                                height={"180px"}
                                                style={{ borderRadius: '5%' }}
                                                src={selectedImage ? URL.createObjectURL(selectedImage) : previewUrl}
                                            />
                                            <br />
                                            {/* Button to remove the selected image */}
                                            <button type="button" onClick={() => {
                                                if (selectedImage) {
                                                    setSelectedImage(null)
                                                } else {
                                                    setPreviewUrl(null)

                                                    setArticleDetails({
                                                        ...articleDetails,
                                                        "field_image": [{
                                                            "target_id": ""
                                                        }]
                                                    })

                                                }
                                            }} className='remove-img rounded border-0 bg-transparent position-absolute top-0 right-0'><IoMdCloseCircle style={{ height: '30px', width: '30px', color: '#1e193dff', backgroundColor: '#ffffff', borderRadius: '50%' }} /></button>

                                        </div>
                                    )}
                                </Col>
                                <Col>
                                    <label htmlFor="blog-gallery">Choose Gallery</label>
                                    <input type="file" name="blog-gallery" id="blog-gallery" accept='image/png image/JPEG' multiple className='form-control' onChange={(e) => {
                                        setGallaryImages(Array.from(e.target.files))
                                    }} />
                                    <div className="d-flex align-items-center" style={{ gap: "5px" }}>
                                        {
                                            selectedGallaryImages.map(selectedImage => (
                                                <div className='mt-2 position-relative'>
                                                    {/* Display the selected image */}
                                                    <img
                                                        alt="not found"
                                                        width={"180px"}
                                                        height={"180px"}
                                                        style={{ borderRadius: '5%' }}
                                                        src={URL.createObjectURL(selectedImage)}
                                                    />
                                                    <br />
                                                    {/* Button to remove the selected image */}
                                                    <button type='button' onClick={() => setGallaryImages(prev => prev.filter(image => image !== selectedImage))} className='remove-img rounded border-0 bg-transparent position-absolute top-0 right-0'><IoMdCloseCircle style={{ height: '30px', width: '30px', color: '#1e193dff', backgroundColor: '#ffffff', borderRadius: '50%' }} /></button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Col>
                            </Row>
                            <center className='mt-4'>
                                <button type="submit" value="" disabled={
                                    articleDetails.title[0].value.length < 2 ||
                                    articleDetails.body[0].value.length < 10 ||
                                    (previewUrl === null && selectedImage === null)
                                }
                                    className='px-4 py-2 border-0 btn btn-primary'>
                                    {
                                        (isLoadingSubmit) ?
                                            'Updating..'
                                            :
                                            'Update'
                                    }
                                    <Toaster
                                        position="top-center"
                                        reverseOrder={false}
                                    />
                                </button>
                            </center>
                        </form>
                    </>
            }

        </Container >
    )
}

export default EditArticle
