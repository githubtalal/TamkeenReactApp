import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { AboutUsServices } from '../Services/AboutUsServices'

import leftD_Q from '../assets/leftDoubleQuatation.png'
import rightD_Q from '../assets/rightDoubleQuatation.png'
import Loading from '../Components/Loading'

const TopTestimonials = () => {

    const [topTestimonials, setTopTestimonials] = useState([])
    const [isLoading, setLoading] = useState(false)

    const loadTopTestimonials = () => {
        setLoading(true)
        AboutUsServices.getTopTestimonials()
            .then((data) => {
                setTopTestimonials(data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                console.log('Done')
            })
    }

    useEffect(() => {
        loadTopTestimonials()
    }, [])

    return (
        (isLoading) ? 
        <Loading />
        :
        <div className='top-testimonials position-relative'>
            <span className='top-testimonials-tag position-absolute' data-aos="zoom-in-right" data-aos-delay="700" data-aos-duration="500" data-aos-easing="linear">Top Testimonials</span>
            <Container>
                <Row>
                    {
                        topTestimonials.map(item => (
                            <Col lg={3} className='mb-4' data-aos="fade-up" data-aos-delay="400" data-aos-duration="500" data-aos-easing="linear">
                                <div className='top-testimonial h-100'>
                                    <div className='d-flex align-items-center position-relative'>
                                        {item.body.replace(/<[^>]*>/g, '')}
                                        <img src={rightD_Q} alt="" className='position-absolute'/>
                                        <img src={leftD_Q} alt="" className='position-absolute'/>
                                    </div>
                                    <div className='py-2 text-center'>
                                        <p>{item.full_name}</p>
                                        <span>Chief Executive Officer of Netflix</span>
                                    </div>
                                </div>
                            </Col>
                        ))

                    }

                </Row>
            </Container>
        </div>
    )
}

export default TopTestimonials