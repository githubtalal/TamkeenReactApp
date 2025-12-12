import React, { useEffect, useState } from 'react'
import '../Styles/ArticleStyle.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ArticlesServices } from '../Services/ArticlesServices'
import { Col, Container, Row } from 'react-bootstrap'
import Loading from '../Components/Loading'
import { MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Bounce, toast, ToastContainer } from 'react-toastify'

const ShowArticle = () => {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const [articleDetails, setArticleDetails] = useState({
        "title": {
            "value": ""
        },
        "description": {
            "value": ""
        },
        "image_url": {
            "value": ""
        },
        "category": {
            "value": ""
        },
        "galaries": {
            "value": []
        }
    })

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

    const { aid } = useParams()

    const [isLoading, setLoading] = useState(true)

    const loadArticleDetails = () => {
        setLoading(true)
        ArticlesServices.getArticleDetails({
            'credentials': userInfo.ps,
            'articleId': aid
        })
            .then(data => {
                setArticleDetails({
                    "title": {
                        "value": data.title[0].value
                    },
                    "description": {
                        "value": data.body[0].processed
                    },
                    "image_url": {
                        "value": data.field_image[0].url
                    },
                    "category": {
                        "value": data.field_category[0] ? data.field_category[0].target_type : ''
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

    const deleteArticle = () => {
        setLoading(true)
        ArticlesServices.deleteArticle({
            "articleId": aid,
            "csrf_token": userInfo.csrf_token,
            "credentials": userInfo.ps
        })
            .then(data => {
                notify()
                navigate('/articlesList')
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Deleted Article Done'))
    }

    return (
        <Container style={{ marginTop: '100px', padding: '50px 0' }} className='article-details'>
            {
                (isLoading) ?
                    <Loading /> :
                    <>
                        <center>
                            <h1 className='title'>{articleDetails.title.value}</h1>
                        </center>
                        <div className="d-flex align-items-start justify-content-between mt-4">
                            <div style={{ width: '47%', height: '100%' }}>
                                <img src={articleDetails.image_url.value} alt="No Article Image" className='img-fluid w-100 rounded' />
                            </div>
                            <div style={{ width: '47%', height: '100%' }}>
                                <h2>Description</h2>
                                <p className='mt-2'>{articleDetails.description.value}</p>
                                <h2 className='mt-4'>Category</h2>
                                <p className='mt-2'>{articleDetails.category.value}</p>
                                <h2 className='mt-4'>galary</h2>
                                <Row className='galary'>
                                    {
                                        articleDetails.galaries.value.map(galary => (
                                            <Col lg={4}>
                                                <div className="h-100">
                                                    <img src={galary.url} alt="No Galary Image" className='img-fluid h-100 w-100' />
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                                
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Article</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to delete this article ?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={deleteArticle}>
                                            Confirm
                                            <ToastContainer
                                                position="top-right"
                                                autoClose={5000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick={false}
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                                pauseOnHover
                                                theme="dark"
                                                transition={Bounce}
                                            />
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </>
            }

        </Container>
    )
}

export default ShowArticle
