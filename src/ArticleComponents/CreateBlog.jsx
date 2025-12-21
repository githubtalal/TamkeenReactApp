import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ArticlesServices } from '../Services/ArticlesServices'
import { AuthService } from '../Services/AuthService'
import { CategoriesServices } from '../Services/CategoriesServices'
import { IoIosClose } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';

const CreateBlog = () => {
    const notify = () => toast.success('New Blog Added successfully', {
        duration: 2000
    });

    const [isSubmissionLoading, setSubmissionLoading] = useState(false)
    const [allGalleryFilled, setGalleryFilled] = useState(false)
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedGallaryImages, setGallaryImages] = useState([])
    const userInfo = JSON.parse(localStorage.getItem('theUserData'))
    const [blogDetails, setBlogDetails] = useState({
        "type": [{
            "target_id": "blog"
        }],
        "title": [{
            "value": ""
        }],
        "body": [{
            "value": "",
            "format": "basic_html"
        }],
        "field_image": [{
            "target_id": ""
        }],
        "field_gallery": [],
        "field_tags": [],
        "field_category": [{
            "target_id": 0
        }]
    })


    const createBlog = () => {
        setSubmissionLoading(true)
        // first fetch session token
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
                                uploadGallery(csrfToken ,selectedImageId)
                            } else {
                                storeBlogDetails(csrfToken, selectedImageId)
                            }
                        })
                        .catch(error => console.log(error))
                        .finally(() => {
                            console.log('Done')

                        })

                })
                .catch(error => console.log(error)).finally(() => console.log('Done fetching token'))
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


        await ArticlesServices.createBlog({
            "csrf_token": sessionToken,
            "credentials": userInfo.ps,
            "type": blogDetails.type,
            "title": blogDetails.title,
            "body": blogDetails.body,
            "field_category": blogDetails.field_category,
            "field_image":  [{ "target_id": bannerId }] ,
            "field_gallery": galleryImages,
            "field_tags": blogDetails.field_tags
        })
            .then(data => {
                setSubmissionLoading(false)
                notify()
            })
            .catch(error => console.log(error))
            .finally(() => console.log('New Blog Created Successfully'))

    }



    const storeBlogDetails = (csrfToken, imageId) => {
        ArticlesServices.createBlog({
            "csrf_token": csrfToken,
            "credentials": userInfo.ps,
            "type": blogDetails.type,
            "title": blogDetails.title,
            "body": blogDetails.body,
            "field_category": blogDetails.field_category,
            "field_image": [{ "target_id": imageId }],
            "field_tags": blogTags ?? blogDetails.field_tags
        })
            .then(data => {
                setSubmissionLoading(false)
                notify()
            })
            .catch(error => console.log(error))
            .finally(() => console.log('New Blog Created Successfully'))
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
        loadCategories()
        loadTags()
    }, [])

    return (
        <Container className='py-4' style={{ marginTop: '100px' }}>
            <center className='mb-4'>
                <h1 className='text text-primary'>Create Blog</h1>
            </center>
            <form method="post" onSubmit={e => {
                e.preventDefault()
                createBlog()
            }
            }>
                <Row className='mb-3'>
                    <Col>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" className='form-control' placeholder='Title ..' onInput={
                            e => setBlogDetails({
                                ...blogDetails,
                                "title": [{
                                    "value": e.target.value
                                }]
                            })
                        } />
                    </Col>
                    <Col>
                        <label htmlFor="category">Select Category</label>
                        <select name="category" id="category" className='form-select' onChange={e => setBlogDetails({
                            ...blogDetails,
                            "field_category": [{
                                "target_id": e.target.value
                            }]
                        })}>
                            <option value="" selected>...</option>
                            {
                                categories.map(category => (
                                    <option value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <label htmlFor="body">Body</label>
                        <textarea name="body" id="body" className='form-control' cols="15" rows="7" placeholder='Body ..' onInput={
                            e => setBlogDetails({
                                ...blogDetails,
                                "body": [{
                                    "value": e.target.value
                                }]
                            })
                        } />
                    </Col>
                    <Col>
                        <label>Choose Blog Tags ...</label>
                        <br />
                        {
                            tags.map(tag => (
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value={tag.id} onChange={e => {
                                        setBlogDetails(prev => {
                                            if (e.target.checked) {
                                                return {
                                                    ...prev,
                                                    "field_tags": [...prev.field_tags, { "target_id": e.target.value }]
                                                }
                                            } else {
                                                return {
                                                    ...prev,
                                                    "field_tags": [...prev.field_tags.filter(tag => tag.target_id !== e.target.value)]
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
                <Row className='mb-3'>
                    <Col>
                        <label htmlFor="blog-image">Choose Blog Image</label>
                        <input type="file" name="blog-image" id="blog-image" accept='image/png image/JPEG' className='form-control' onChange={(e) => {
                            setSelectedImage(e.target.files[0])
                        }} />
                        {selectedImage && (
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
                                <button type='button' onClick={() => setSelectedImage(null)} className='rounded border-0 bg-transparent position-absolute top-0 right-0'><IoIosClose style={{ height: '50px', width: '50px', color: 'white', fontWeight: '500' }} /></button>

                            </div>
                        )}
                    </Col>
                    <Col>
                        <label htmlFor="blog-image">Choose Blog Image</label>
                        <input type="file" name="blog-image" id="blog-image" accept='image/png image/JPEG' multiple className='form-control' onChange={(e) => {
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
                                        <button type='button' onClick={() => setGallaryImages(prev => prev.filter(image => image !== selectedImage))} className='rounded border-0 bg-transparent position-absolute top-0 right-0'><IoIosClose style={{ height: '50px', width: '50px', color: 'white', fontWeight: '500' }} /></button>
                                    </div>
                                ))
                            }
                        </div>

                    </Col>
                </Row>
                <button type="submit" className='btn btn-primary border-0 w-25'>
                    {
                        (isSubmissionLoading) ?
                            'Creating in progress ..'
                            :
                            "Create"
                    }
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                </button>
            </form>
        </Container>
    )
}

export default CreateBlog
