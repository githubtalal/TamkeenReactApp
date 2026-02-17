import React from 'react'
import noteBook from '../assets/notebook.png'
import circleWavyCheck from '../assets/CircleWavyCheck.png'
import stack from '../assets/Stack.png'
import weAre1 from '../assets/weAre1.jpg'
import weAre2 from '../assets/weAre2.jpg'
import weAre3 from '../assets/weAre3.jpg'
import weAre4 from '../assets/weAre4.jpg'
import joinUs from '../assets/joinUs.png'
import { Container } from 'react-bootstrap'

const AboutUsInfo = () => {
    return (
        <Container className='d-flex align-items-center how-are-we justify-content-between'>
            <div className='position-relative h-100'>
                <img src={weAre1} alt="" className='position-absolute' data-aos="fade-right" data-aos-delay="500" data-aos-duration="500" data-aos-easing="linear" data-aos-anchor-placement="top-center"/>
                <img src={weAre2} alt="" className='position-absolute' data-aos="fade-down" data-aos-delay="600" data-aos-duration="500" data-aos-easing="linear" />
                <img src={weAre3} alt="" className='position-absolute' data-aos="fade-up" data-aos-delay="600" data-aos-duration="500" data-aos-easing="linear" data-aos-anchor-placement="top-center"/>
                <img src={weAre4} alt="" className='position-absolute' data-aos="fade-right" data-aos-delay="500" data-aos-duration="500" data-aos-easing="linear"/>
                <img src={joinUs} alt="" className='position-absolute' data-aos="zoom-out" data-aos-delay="800" data-aos-duration="500" data-aos-easing="linear"/>
            </div>
            <div className='text-end'>
                <h2 data-aos="fade-left" data-aos-delay="500" data-aos-duration="500" data-aos-easing="linear">We’ve been here almost 15 years</h2>
                <p data-aos="zoom-in" data-aos-delay="700" data-aos-duration="500" data-aos-easing="linear">Fusce lobortis leo augue, sit amet tristique nisi commodo in. Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc libero. Curabitur in urna ligula.  torquent per conubia nostra.</p>
                <div className="d-flex">
                    <div className='d-flex justify-content-between'>
                        <img src={noteBook} alt="" />
                        <div>
                            <h5>26k</h5>
                            <span>Certified Instructor</span>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <img src={circleWavyCheck} alt="" />
                        <div>
                            <h5>99.9%</h5>
                            <span>Success Rate</span>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <img src={stack} alt="" />
                        <div>
                            <h5>57</h5>
                            <span>Trusted Companies</span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AboutUsInfo