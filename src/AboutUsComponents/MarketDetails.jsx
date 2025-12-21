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
import Loading from '../Components/Loading';

const MarketDetails = () => {
    const [marketingDetails, setMarketingDetails] = useState([])
    const [isLoading, setLoading] = useState(false)

    const loadMarketingDetails = () => {
        setLoading(true)
        setMarketingDetails(AboutUsServices.getMarketingDetails)
        setLoading(false)
    }

    useEffect(() => {
        loadMarketingDetails()
    }, [])

    return (
        (isLoading) ?
        <Loading />
        :
        <Container>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper" style={{ paddingBottom: '20px', paddingTop: '40px' }}>
                {
                    marketingDetails.map(marketingDetail => (
                        <SwiperSlide>
                            <div className="d-flex align-items-center marketing-container">
                                <div className='w-50'>
                                    <span>{marketingDetail.yearsRange}</span>
                                    <h1 data-aos="fade-right" data-aos-delay="800" data-aos-duration="500" data-aos-easing="linear">{marketingDetail.head}</h1>
                                    <p data-aos="zoom-in" data-aos-delay="1200" data-aos-duration="500" data-aos-easing="linear">{marketingDetail.description}</p>
                                </div>
                                <div className='w-50'>
                                    <img src={marketingDetail.image} alt="" className='img-fluid h-100' />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Container>
    )
}

export default MarketDetails