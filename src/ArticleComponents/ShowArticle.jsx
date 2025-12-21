import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Styles/ArticleStyle.css'
import { useParams } from 'react-router-dom'
import { ArticlesServices } from '../Services/ArticlesServices'
import { Container, Row, Col } from 'react-bootstrap'
import Loading from '../Components/Loading'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const ShowArticle = () => {

    useEffect(() => {
        AOS.init();
    }, [])

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
                        "value": data.title[0] ? data.title[0].value : ""
                    },
                    "description": {
                        "value": data.body[0] ? data.body[0].processed : ""
                    },
                    "image_url": {
                        "value": data.field_image[0] ? data.field_image[0].url : ""
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

    return (
        <Container style={{ marginTop: '100px', padding: '50px 0' }} className='article-details'>
            {
                (isLoading) ?
                    <Loading /> :
                    <>
                        <Row className='mb-2'>
                            <Col>
                                <h2 data-aos="zoom-up-left" data-aos-delay="1000" data-aos-duration="600" data-aos-easing="linear">Title</h2>
                                <p data-aos="zoom-out" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear">{articleDetails.title.value}</p></Col>
                            <Col>
                                <h2 data-aos="zoom-up-left" data-aos-delay="1000" data-aos-duration="600" data-aos-easing="linear">Category</h2>
                                <p data-aos="zoom-out" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear">{articleDetails.category.value}</p>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col>
                                <h2 data-aos="zoom-up-left" data-aos-delay="1000" data-aos-duration="600" data-aos-easing="linear">Description</h2>
                                <p data-aos="zoom-out" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear">{articleDetails.description.value}</p>
                            </Col>
                        </Row>
                        <div className="d-flex align-items-start justify-content-between">
                            <img src={articleDetails.image_url.value} alt="No Article Image" className='img-fluid rounded h-100 article-img' style={{ boxShadow: '10px 10px 10px #5b60a7', width: '47%' }} data-aos="zoom-in" data-aos-delay="1000" data-aos-duration="600" data-aos-easing="linear" />
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                navigation={true}
                                modules={[Autoplay, Navigation]}
                                style={{ width: '47%' }}
                                className="mySwiper h-100"
                            >
                                {
                                    articleDetails.galaries.value.map(galary => (
                                        <SwiperSlide className="h-100"><img src={galary.url} alt="No Galary Image" className='img-fluid h-100 w-100' style={{ boxShadow: 'none', objectFit: 'cover' }} /></SwiperSlide>
                                    ))
                                }

                            </Swiper>
                        </div>
                    </>
            }

        </Container>
    )
}

export default ShowArticle
