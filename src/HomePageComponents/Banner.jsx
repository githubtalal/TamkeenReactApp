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
                                    <h1 className='article-title'>{article.title}</h1>
                                    <p className='article-desc'>{article.description}</p>
                                    <div className="d-flex align-items-center article-btns">
                                        <button className='border-0'>{article.btn1}</button>
                                        <button className='border-0'>{article.btn2}</button>
                                    </div>
                                </div>
                                <div className='position-relative h-100'>
                                    <img src={article.img1} alt="" className='position-absolute' />
                                    <img src={article.img2} alt="" className='position-relative' />
                                    <img src={article.img3} alt="" className='position-absolute' />
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
