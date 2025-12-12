import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import arrowLeft from '../assets/ArrowLeft.png'
import { ContactUsServices } from '../Services/ContactUsServices'

import { Virtual, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Loading from '../Components/Loading';


const Branches = () => {

    const [branches, setBranches] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setBranches(ContactUsServices.getContactUsBranches)
        setLoading(false)
    }, [])

    return (
        (isLoading) ? 
        <Loading />
        :
        <Container className='py-4 mt-4 branchs'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <a href="">
                        <img src={arrowLeft} alt="" />
                        Browse All
                    </a>
                    <span>We have more Branches to check out.</span>
                </div>
                <p>Browse Our <span>Branches</span></p>
            </div>
            <Swiper
                modules={[Virtual, Navigation]}
                slidesPerView={3}
                centeredSlides={false}
                spaceBetween={55}
                navigation={true}
                virtual
                className='branches-container'
            >
                {branches.map((branch, index) => (
                    <SwiperSlide key={index} virtualIndex={index} className='branch position-relative'>
                        <img src={branch.cover} alt="" className='img-fluid w-100 h-100' />
                        <span className='branch-tag position-absolute'>{branch.tag}</span>
                        <p className='position-absolute text-center'>{branch.brief}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    )
}

export default Branches