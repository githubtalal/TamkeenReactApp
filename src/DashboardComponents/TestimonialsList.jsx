import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { AboutUsServices } from '../Services/AboutUsServices'

import leftD_Q from '../assets/leftDoubleQuatation.png'
import rightD_Q from '../assets/rightDoubleQuatation.png'
import Loading from '../Components/Loading'

const TestimonialsList = () => {

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
        <Container className='testimonials-list'>
            {
                (isLoading) ?
                    <Loading />
                    :

                    <Row>
                        {
                            topTestimonials.map(item => (
                                <Col lg={3} className='mb-4' data-aos="fade-up" data-aos-delay="1000" data-aos-duration="600" data-aos-easing="linear">
                                    <div className='top-testimonial h-100'>
                                        <div className='d-flex align-items-center position-relative'>
                                            {item.body.replace(/<[^>]*>/g, '')}
                                            <img src={rightD_Q} alt="" className='position-absolute' />
                                            <img src={leftD_Q} alt="" className='position-absolute' />
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
            }
        </Container>

    )
}

export default TestimonialsList