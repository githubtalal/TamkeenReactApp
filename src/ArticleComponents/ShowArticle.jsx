import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Styles/ArticleStyle.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArticlesServices } from '../Services/ArticlesServices'
import { CategoriesServices } from '../Services/CategoriesServices'
import { Container, Row, Col } from 'react-bootstrap'
import Loading from '../Components/Loading'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiCategoryAlt } from "react-icons/bi";

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

    const [category, setCategory] = useState()
    const [tags, setTags] = useState([])

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
        "galaries": {
            "value": []
        }
    })

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

    if (!userInfo) {
        return <Navigate to="/" replace />
    }
    const { aid } = useParams()

    const [isLoading, setLoading] = useState(true)

    const loadArticleDetails = () => {
        setLoading(true)
        ArticlesServices.getArticleDetails({
            'credentials': userInfo.ps,
            'articleId': aid
        })
            .then(data => {

                // get Article Category
                let categoryId = data.field_category[0] ? data.field_category[0].target_id : ""
                let articleCategory = null
                CategoriesServices.getCategories()
                    .then(categories => {
                        return categories.filter(category => parseInt(category.id) === parseInt(categoryId))
                    })
                    .then(cat => {
                        setCategory(cat[0].name)
                    })

                // get Article Tags
                let tagIds = data.field_tags.map(tag => {
                    return tag.target_id
                })

                ArticlesServices.getTags()
                    .then(tags => {
                        return tags.filter(tag => tagIds.includes(parseInt(tag.id)))
                    })
                    .then(articleTags => {
                        setTags(articleTags)
                    })

                setArticleDetails({
                    "title": {
                        "value": data.title[0] ? data.title[0].value : ""
                    },
                    "body": {
                        "value": data.body[0] ? data.body[0].processed : ""
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

    const toggleText = (event) => {
        event.preventDefault()
        var dots = document.getElementById("dots");
        var moreText = document.getElementById("more-text");
        var buttonText = document.getElementById("toggle-button");

        if (dots.classList.contains("d-none")) {
            // If "more" text is visible (dots are hidden)
            dots.classList.remove("d-none")
            moreText.classList.add("d-none");
            buttonText.innerHTML = "Read more";
        } else {
            // If "more" text is hidden (dots are visible)
            dots.classList.add("d-none")
            moreText.classList.remove("d-none");
            buttonText.innerHTML = "Read less";
        }
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
                        <h1 className="text-center mb-4 px-3" data-aos="zoom-out" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear" style={{ color: '#24127aff' }}>{articleDetails.title.value}</h1>
                        <div className='mb-2 px-3'>
                            <BiCategoryAlt data-aos="fade-right" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear" className="mb-3" style={{ color: '#58bcb8ff', height: '35px', width: '35px', marginRight: '10px' }} />
                            <h2 data-aos="zoom-out" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear" className='d-inline mt-2' style={{ color: '#2e4a72ff', textTransform: 'capitalize' }}>{category}</h2>
                        </div>
                        <Row className='mb-2 px-3'>
                            <Col sm={12} md={6} lg={6}>
                                <h2 data-aos="zoom-up-left" data-aos-delay="1000" data-aos-duration="600" data-aos-easing="linear">Body</h2>
                                <p data-aos="zoom-out" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear">
                                    {articleDetails.body.value.substring(0, 200)}
                                    <span id="dots">...</span>
                                    <span id="more-text" className='d-none'>
                                        {articleDetails.body.value.substring(200)}
                                    </span>
                                    <a href='' id="toggle-button" onClick={e => toggleText(e)}>Read more</a>
                                </p>
                            </Col>
                            <Col>
                                <h2 data-aos="zoom-up-left" data-aos-delay="1000" data-aos-duration="600" data-aos-easing="linear">Tags</h2>
                                <ul>
                                    {
                                        tags.map(tag => (
                                            <li data-aos="zoom-out" data-aos-delay="1000" data-aos-duration="600" data-aos-easing="linear" style={{ color: '#586e72', fontSize: '20px', fontWeight: '400' }}>{tag.name}</li>
                                        ))
                                    }
                                </ul>

                            </Col>
                        </Row>
                        <div className="d-flex align-items-start justify-content-between px-3 article-imgs">
                            <img src={articleDetails.image_url.value} alt="No Article Image" className='img-fluid rounded h-100 article-img' style={{ boxShadow: '10px 10px 10px #5b60a7', width: '47%' }} data-aos="zoom-in" data-aos-delay="500" data-aos-duration="500" data-aos-easing="linear" />
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
