import React, { useEffect, useState } from 'react'
import { VacanciesServices } from '../Services/VacanciesServices'
import arrowOutlined from '../assets/arrowOutlined.png'
import { Container } from 'react-bootstrap'
import circle from '../assets/circle.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Banner = () => {

    const [jobsIntroDetails, setJobsIntroDetails] = useState([])

    function loadJobsIntroDetails() {
        setJobsIntroDetails(VacanciesServices.getJobsIntroDetails)
    }

    useEffect(() => {
        loadJobsIntroDetails()
    }, [])

    return (
        <div className='jobs-intro'>
            <Container>
                <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                    {
                        jobsIntroDetails.map(item => (
                            <SwiperSlide className='jobs-intro-detail'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='w-50'>
                                        <h1>{item.head}</h1>
                                        <p>{item.description}</p>
                                        <a href="">
                                            <span>{item.viewJobBtn}</span>
                                            <img src={arrowOutlined} alt="" />
                                        </a>
                                    </div>
                                    <div className='position-relative w-50'>
                                        <img src={circle} alt="" />
                                        <img src={item.hrRev} alt="" className='position-absolute' />
                                        <img src={item.longCurve} alt="" className='position-absolute' />
                                        <img src={item.fthr} alt="" className='position-absolute' />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Container>
        </div>
    )
}

export default Banner
