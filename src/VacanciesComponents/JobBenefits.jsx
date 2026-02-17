import React, { useEffect, useState } from 'react'
import { VacanciesServices } from '../Services/VacanciesServices'
import { Container } from 'react-bootstrap'
import feather from '../assets/feather.png'
import longLine from '../assets/longLine.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const JobBenefits = () => {

    const [jobBenefits, setJobBenefits] = useState([])

    function loadJobBenefits() {
        setJobBenefits(VacanciesServices.getJobBenefits)
    }

    useEffect(() => {
        loadJobBenefits()
    }, [])


    return (
        <Container className='job-benefits'>
            <h3 data-aos="fade-right" data-aos-delay="4000" data-aos-duration="1000">Our Perks & <span>Benefits</span></h3>
            <div className='d-flex position-relative'>
                
                    {
                        jobBenefits.map((jobBenefit, index) => (
                            <Swiper pagination={true} modules={[Pagination]} className="mySwiper" style={{ width: 'calc(80% / 4)', borderRadius: '59px' }}  data-aos="zoom-in" data-aos-delay="500" data-aos-duration="500">
                                {
                                    jobBenefit.map(item => (
                                        <SwiperSlide style={{ padding: '30px 0' }} className='text-center'>
                                            <center>
                                                <img src={item.icon} alt="" />
                                            </center>
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        ))
                    }
                <img src={longLine} alt="" className='position-absolute long-line' />
            </div>


        </Container>
    )
}

export default JobBenefits
