import React, { useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Container } from 'react-bootstrap';
import { AboutUsServices } from '../Services/AboutUsServices';
import { ContactUsServices } from '../Services/ContactUsServices';

import contactUsIntroCover from '../assets/contactIntroCover.jpg'
import envelope from '../assets/Envelope.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import rectangle from '../assets/Rectangle.png'
import Loading from '../Components/Loading';

const Banner = () => {

    const [contactUsIntroDetails, setContactUsIntroDetails] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setContactUsIntroDetails(ContactUsServices.getContactIntroDetails)
        setLoading(false)
    }, [])


    return (
        (isLoading) ?
        <Loading />
        :
        <div className='contact-intro' style={{ backgroundImage: `url(${contactUsIntroCover}), url(${rectangle})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <Container>
                <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                    {
                        contactUsIntroDetails.map(item => (
                            <SwiperSlide className='contact-intro-detail'>
                                <h3  data-aos="fade-right" data-aos-delay="500" data-aos-duration="600" data-aos-easing="linear">{item.title}</h3>
                                <p  data-aos="zoom-out" data-aos-delay="1000" data-aos-duration="600" data-aos-easing="linear">{item.description}</p>
                                <button className='border-0 rounded d-flex align-items-center'>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <h6 className='mb-0'>Copy Email</h6>
                                </button>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Container>
        </div>
    )
}

export default Banner