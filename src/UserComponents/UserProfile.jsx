import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from 'react-router-dom'
import { UserProfileServices } from '../Services/UserProfileServices'
import { Col, Container, Row } from 'react-bootstrap'
import Loading from '../Components/Loading';

const UserProfile = () => {
    useEffect(() => {
        AOS.init();
    }, [])

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

    const [isLoading, setLoading] = useState(false)

    const [userDetails, setUserDetails] = useState({
        "name": "",
        "first_name": "",
        "last_name": "",
        "mobile": "",
        "email": "",
        "image_url": ""
    })

    const { uid } = useParams()

    const loadUserDetails = () => {
        setLoading(true)
        return UserProfileServices.getUserProfile({
            "user_id": uid,
            "credentials": userInfo.ps
        })
            .then(data => {
                setUserDetails({
                    ...userDetails,
                    "name": data.name[0] ? data.name[0].value : "",
                    "email": data.mail[0] ? data.mail[0].value : "",
                    "first_name": data.field_name[0] ? data.field_name[0].value : "",
                    "last_name": data.field_surname[0] ? data.field_surname[0].value : "",
                    "mobile": data.field_mobile[0] ? data.field_mobile[0].value : "",
                    "image_url": data.user_picture[0] ? data.user_picture[0].url : ""
                })
                setLoading(false)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done fetching user profile'))
    }

    useEffect(() => {
        loadUserDetails()
    }, [])

    return (
        <Container className='user-details py-4'>
            {
                (isLoading) ?
                    <Loading />
                    :
                    <>
                        <center className='py-4'>
                            <h1 data-aos="zoom-out" data-aos-delay="500" data-aos-duration="600" data-aos-easing="linear">{userDetails.name}</h1>
                        </center>
                        <div className='d-flex align-items-start justify-content-between mt-4 mb-4'>
                            <div style={{ width: '47%' }} className='h-100' data-aos="zoom-out" data-aos-delay="1000" data-aos-duration="600" data-aos-easing="linear">
                                <img src={userDetails.image_url} alt="No user image" className='img-fluid h-100 w-100 rounded' />
                            </div>
                            <div style={{ width: '47%' }}>
                                <Row className="mb-4">
                                    <Col lg={6}>
                                        <h2 data-aos="zoom-up-left" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear">First Name</h2>
                                        <p data-aos="zoom-out" data-aos-delay="2000" data-aos-duration="600" data-aos-easing="linear">{userDetails.first_name}</p>
                                    </Col>
                                    <Col lg={6}>
                                        <h2 data-aos="zoom-up-right" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear">Last Name</h2>
                                        <p data-aos="zoom-out" data-aos-delay="2000" data-aos-duration="600" data-aos-easing="linear">{userDetails.last_name}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <h2 data-aos="zoom-up-left" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear">Mobile</h2>
                                        <p data-aos="zoom-out" data-aos-delay="2000" data-aos-duration="600" data-aos-easing="linear">{userDetails.mobile}</p>
                                    </Col>
                                    <Col lg={6}>
                                        <h2 data-aos="zoom-up-right" data-aos-delay="1500" data-aos-duration="600" data-aos-easing="linear">Email</h2>
                                        <p data-aos="zoom-out" data-aos-delay="2000" data-aos-duration="600" data-aos-easing="linear">{userDetails.email}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </>
            }

        </Container>
    )
}

export default UserProfile
