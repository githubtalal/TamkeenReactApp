import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import phoneIcon from '../assets/phoneIcon.png'
import faxIcon from '../assets/faxIcon.png'
import emailIcon from '../assets/emailIcon.png'

const ContactUsForm = () => {
    return (
        <Container className='d-flex align-items-center contact-entries mt-3 mb-4' style={{ gap: '50px' }}>
            <div className='w-50'>
                <h1>Contact US </h1>
                <p>Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
                <form action="">
                    <Row className='mb-4'>
                        <Col>
                            <input type="text" className="form-control p-4" placeholder="First name *" aria-label="First name" />
                        </Col>
                        <Col>
                            <input type="text" className="form-control p-4" placeholder="Last name *" aria-label="Last name" />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <input type="email" className='form-control p-4' placeholder="Email" />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <input type="text" className='form-control p-4' placeholder='Subject *' />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <select id="ourSpoter" className="form-select p-4">
                                <option selected>How did find us ?</option>
                                <option>...</option>
                            </select>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <textarea className="form-control p-4" id="message" rows="3" placeholder='Message'></textarea>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col>
                            <input type="submit" value='SEND' className='w-100 border-0' />
                        </Col>
                    </Row>
                </form>
                <div className="d-flex justify-content-between align-items-center contact-methods-container">
                    <div className='d-flex align-items-center'>
                        <img src={phoneIcon} alt="" />
                        <div>
                            <h4>PHONE</h4>
                            <span>03 5432 1234</span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <img src={faxIcon} alt="" />
                        <div>
                            <h4>FAX</h4>
                            <span>03 5432 1234</span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <img src={emailIcon} alt="" />
                        <div>
                            <h4>EMAIL</h4>
                            <span>info@marcc.com.au</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-50 h-100'>
                <iframe src="https://maps.google.com/maps?hl=en&amp;coord=52.70967533219885, -8.020019531250002&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" className='w-100' style={{ height: '780px' }}></iframe>
            </div>
        </Container>
    )
}

export default ContactUsForm
