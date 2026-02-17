import React, { useEffect } from 'react'
import arrowRight from '../assets/ArrowRight.png'
import starIcon from '../assets/Star.png'

import { useRef, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Container } from 'react-bootstrap';
import { HomePageServices } from '../Services/HomePageServices';
import Loading from '../Components/Loading';

const TopWriters = () => {

    const [topWriters, setTopWriters] = useState([])
    const [isLoading, setLoading] = useState(false)

    function loadTopWriters() {
        setLoading(true)
        setTopWriters(HomePageServices.getTopWriters)
        setLoading(false)
    }

    useEffect(() => {
        loadTopWriters()
    }, [])

    return (
        (isLoading) ?
            <Loading />
            :
            <Container className='top-writers position-relative'>
                <span className='position-absolute top-writer-tag' data-aos="zoom-in-left" data-aos-delay="500" data-aos-duration="1000">View More</span>
                <div className="d-flex justify-content-between align items center flex-wrap">
                    <h3 className='mb-3' data-aos="fade-right" data-aos-delay="600" data-aos-duration="1000">Check out our Top <span>Writers</span></h3>
                    <div>
                        <span>Thousands of users waiting for a Articles. Start writing & earning now!.</span>
                        <a href="">
                            Browse All <img src={arrowRight} alt="" />
                        </a>
                    </div>
                </div>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    breakpoints={{
                        576: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2
                        },
                        990: {
                            slidesPerView: 3
                        }
                    }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={false}
                    className="top-writer"
                    modules={[EffectCoverflow, Pagination]}
                    style={{ padding: '50px' }}
                >
                    {

                        topWriters.map((topWriter, index) => (
                            <SwiperSlide key={index} className='p-3' data-aos="flip-up" data-aos-delay="400" data-aos-duration="1000">
                                <div>
                                    <img src={topWriter.wImg} alt="" className='img-fluid w-100' />
                                </div>
                                <div className='text-center mt-3 writer-details'>
                                    <span className='w-100 d-block'>
                                        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-3'>
                                            <path d="M39.787 40.7295C39.787 40.7295 22.7028 30.7504 12.6815 12.4434" stroke="#6341AF" stroke-width="1.64583" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M35.0308 37.4952C16.6145 41.915 15.2 27.6934 15.2 27.6934" stroke="#6341AF" stroke-width="1.64583" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M27.4063 27.883C26.9339 21.8052 29.1936 18.8622 29.1936 18.8622C36.6571 27.0176 35.6432 35.312 35.0308 37.496M24.4374 32.0546C20.2276 31.0285 16.3488 28.9463 13.1674 26.0046C6.34791 19.7371 6.3527 10.5946 6.21374 6.93187C6.20589 6.69051 6.25249 6.45047 6.35011 6.22959C6.44772 6.0087 6.59382 5.81263 6.77758 5.65594C6.96134 5.49925 7.17803 5.38596 7.41156 5.32447C7.6451 5.26299 7.88948 5.2549 8.12657 5.30079C22.4776 8.13171 27.3412 22.9006 27.3412 22.9006" stroke="#6341AF" stroke-width="1.64583" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <span>{topWriter.wName}</span>
                                    </span>
                                    <p className='py-3'>{topWriter.articleTitle}</p>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <img src={starIcon} alt="" />
                                            <span style={{ verticalAlign: 'center' }}>{topWriter.articleRate}</span>
                                        </div>
                                        <div><span>{topWriter.nO_Articles}</span> <span>Articles</span></div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Container>
    )
}

export default TopWriters