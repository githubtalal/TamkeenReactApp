import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserProfileServices } from './Services/UserProfileServices'
import { Col, Container, Row } from 'react-bootstrap'

const UserProfile = () => {

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

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
        return UserProfileServices.getUserProfile({
            "user_id": uid,
            "credentials": userInfo.ps
        })
            .then(data => {
                console.log(data)
                setUserDetails({
                    ...userDetails,
                    "name": data.name[0] ? data.name[0].value : "",
                    "email": data.mail[0] ? data.mail[0].value : "",
                    "first_name": data.field_name[0] ? data.field_name[0].value : "",
                    "last_name": data.field_surname[0] ? data.field_surname[0].value : "",
                    "mobile": data.field_mobile[0] ? data.field_mobile[0].value : "",
                    "image_url": data.user_picture[0] ? data.user_picture[0].url : ""
                })
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done fetching user profile'))
    }

    useEffect(() => {
        loadUserDetails()
    })
    return (
        <Container className='user-details py-4'>
            <center className='py-4'>
                <h1>{userDetails.name}</h1>
            </center>
            <div className='d-flex align-items-start justify-content-between mt-4'>
                <div style={{ width: '47%'}} className='h-100'>
                    <img src={userDetails.image_url} alt="No user image" className='img-fluid h-100 w-100 rounded'/>
                </div>
                <div style={{ width: '47%' }}>
                    <Row className="mb-4">
                        <Col lg={6}>
                            <h2>First Name</h2>
                            <p>{userDetails.first_name}</p>
                        </Col>
                        <Col lg={6}>
                            <h2>Last Name</h2>
                            <p>{userDetails.last_name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <h2>Mobile</h2>
                            <p>{userDetails.mobile}</p>
                        </Col>
                        <Col lg={6}>
                            <h2>Email</h2>
                            <p>{userDetails.email}</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    )
}

export default UserProfile
