import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArticlesServices } from '../Services/ArticlesServices'
import Loading from '../Components/Loading'
import { Container, Row, Col } from 'react-bootstrap'
//import { Bounce, toast, ToastContainer } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';
import { IoIosClose } from "react-icons/io";

const EditArticle = () => {
    const notify = () => toast.success('Article Updated successfully', {
        duration: 2000
    });


    const [isLoadingSubmit, setLoadingSubmit] = useState(false)
    const [selectedImgId, setSelectedImgId] = useState(0)

    const [articleDetails, setArticleDetails] = useState({
        "type": {
            "value": ""
        },
        "title": {
            "value": ""
        },
        "description": {
            "value": ""
        },
        "image_url": {
            "value": ""
        },
        "galaries": {
            "value": ""
        }
    })

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))
    const { aid } = useParams()
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null)

    const [isLoading, setLoading] = useState(true)

    const loadArticleDetails = () => {
        setLoading(true)
        ArticlesServices.getArticleDetails({
            'articleId': aid,
            'credentials': userInfo.ps
        })
            .then(data => {
                setArticleDetails({
                    "type": {
                        "value": data.type[0] ? data.type[0].target_id : ""
                    },
                    "title": {
                        "value": data.title[0] ? data.title[0].value : ""
                    },
                    "description": {
                        "value": data.body[0] ? data.body[0].value : ""
                    },
                    "image_url": {
                        "value": data.field_image[0] ? data.field_image[0].url : ""
                    },
                    "galaries": {
                        "value": data.field_gallery
                    }
                })
                setLoading(false)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done'))
    }

    useEffect(() => {
        loadArticleDetails()
    }, [])

    const callAPI = () => {
        setLoadingSubmit(true)
        if (selectedImage) {
            uploadArticleImage()
        } else {
            updateArticle()
        }

    }

    const uploadArticleImage = () => {
        ArticlesServices.uploadArticleImage({
            'csrf_token': userInfo.csrf_token,
            'credentials': userInfo.ps,
            'file': selectedImage,
            'file_name': selectedImage.name
        })
            .then(data => {
                console.log(data)
                setPreviewUrl(data.url)
                updateArticle(data.fid)
            })
            .catch(error => console.log(error))
            .finally(() => {
                console.log('Done')
            })
    }

    const updateArticle = (imageId) => {
        ArticlesServices.updateArticle({
            'articleId': aid,
            'csrf_token': userInfo.csrf_token,
            'credentials': userInfo.ps,
            'body': articleDetails,
            'field_image': imageId
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
                        <div className="d-flex align-items-start justify-content-between mt-4">
                            <div style={{ width: '47%', height: '100%' }}>
                                <img src={previewUrl ?? articleDetails.image_url.value} alt="No Article Image" className='img-fluid w-100 rounded article-img' />
                            </div>
                            <form
                                style={{ width: '47%', height: '100%' }}
                                onSubmit={e => {
                                    e.preventDefault()
                                    callAPI()
                                }}
                            >
                                <Row>
                                    <Col>
                                        <label htmlFor="title">Title</label>
                                        <input type="text" className='form-control' id="title" value={articleDetails.title.value} onInput={e =>
                                            setArticleDetails({
                                                ...articleDetails,
                                                'title': {
                                                    "value": e.target.value
                                                }
                                            })
                                        } />
                                        {
                                            (articleDetails.title.value.length > 0 && articleDetails.title.value.length < 2) ?
                                                <p className='text-text-danger'>Article title must have at least 2 characters</p>
                                                :
                                                ""
                                        }
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col>
                                        <label htmlFor="description">Article Description</label>
                                        <textarea name="" id="description" cols="30" rows="10" className='form-control' value={articleDetails.description.value} onInput={e =>
                                            setArticleDetails({
                                                ...articleDetails,
                                                'description': {
                                                    "value": e.target.value
                                                }
                                            })} />
                                        {
                                            (articleDetails.description.value.length > 0 && articleDetails.description.value.length < 10) ?
                                                <p className='text text-danger mt-2'>article description must have at least 10 characters</p>
                                                :
                                                ''
                                        }
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col>
                                        <label htmlFor="articleImage">Upload Image</label>
                                        <input type="file" name="" id="articleImage" className='form-control' accept='image/jpeg image/png' onChange={(e) => {
                                            console.log(e.target.files)
                                            setSelectedImage(e.target.files[0])
                                        }} />

                                    </Col>
                                    <Col className="text-start">
                                        {selectedImage && (
                                            <div className='position-relative'>
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
                                                <button onClick={() => setSelectedImage(null)} className='rounded border-0 bg-transparent position-absolute top-0 right-0'><IoIosClose style={{ height: '50px', width: '50px', color: 'white', fontWeight: '500' }} /></button>

                                            </div>
                                        )}
                                    </Col>
                                </Row>
                                <center className='mt-4'>
                                    <button type="submit" value="" disabled={
                                        articleDetails.title.value.length < 2 ||
                                        articleDetails.description.value.length < 10
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
                        </div>
                    </>
            }

        </Container>
    )
}

export default EditArticle
