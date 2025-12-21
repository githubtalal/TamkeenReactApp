import lightIcon from '../assets/lightIcon.avif'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { HomePageServices } from '../Services/HomePageServices';


const Banner = () => {

    const [articlesIntro, setArticlesIntro] = useState([])

    function loadArticlesIntro() {
        setArticlesIntro(HomePageServices.getArticlesIntro)
    }

    useEffect(() => {
        loadArticlesIntro()
    }, [])

    return (
        <Container>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper" style={{ paddingBottom: '100px', paddingTop: '40px' }}>
                {
                    articlesIntro.map(article => (
                        <SwiperSlide className='position-relative'>
                            <div className="d-flex article align-items-center justify-centent-between">
                                <div className='h-100'>
                                    <h1 className='article-title' data-aos="fade-up" data-aos-delay="700" data-aos-duration="2000">{article.title}</h1>
                                    <p className='article-desc' data-aos="zoom-in" data-aos-delay="1500" data-aos-duration="1000" data-aos-easing="linear">{article.description}</p>
                                    <div className="d-flex align-items-center article-btns">
                                        <button className='border-0'>{article.btn1}</button>
                                        <button className='border-0'>{article.btn2}</button>
                                    </div>
                                </div>
                                <div className='position-relative h-100'>
                                    <img src={article.img1} alt="" className='position-absolute' data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000"/>
                                    <img src={article.img2} alt="" className='position-relative' data-aos="fade-down" data-aos-delay="400" data-aos-duration="1000"/>
                                    <img src={article.img3} alt="" className='position-absolute' data-aos="fade-left" data-aos-delay="500" data-aos-duration="1200"/>
                                    <img src={article.fthr} alt="" className='position-relative' />
                                    <img src={article.lVector} alt="" className='position-absolute' />
                                    <img src={article.sVector} alt="" className='position-relative' />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Container>

    )
}

export default Banner
