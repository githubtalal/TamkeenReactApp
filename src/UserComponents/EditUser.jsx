import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { AuthService } from '../Services/AuthService'
import { UserProfileServices } from '../Services/UserProfileServices'
//import { Bounce, toast, ToastContainer } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';
import { IoIosClose } from "react-icons/io";

const EditUser = () => {
const notify = () => toast.success('User updated successfully', {
    duration: 2000
});

    const [currentUserData, setCurrentUserData] = useState(
        {
            "field_name":
            {
                "value": ""
            },
            "field_surname":
            {
                "value": ""
            },
            "user_picture":
            {
                "target_id": ""
            }
        }
    )

    const [isLoading, setLoading] = useState(false)

    const { uid } = useParams()

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

    const [selectedImage, setSelectedImage] = useState(null);

    const [imagePreviewUrl, setImagePreviewUrl] = useState()


    const [updatedUserData, setUpdatedUserData] = useState(

        {
            "field_name":
            {
                "value": ""
            }
            ,
            "field_surname":
            {
                "value": ""
            },
            "user_picture":
            {
                "value": "",
                "target_id": ""
            }

        }

    )

    const loadCurrentUserProfile = () => {
        if (userInfo) {
            AuthService.getCurrentUsrProfile({
                userId: uid,
                credentials: userInfo.ps
            })
                .then((data) => {
                    console.log(data)
                    setUpdatedUserData({
                        ...updatedUserData,
                        "field_name":
                        {
                            "value": `${data.field_name[0] ? data.field_name[0].value : ""}`
                        },
                        "field_surname":
                        {
                            "value": `${data.field_surname[0] ? data.field_surname[0].value : ""}`
                        },
                        "user_picture":
                        {
                            "url": `${data.user_picture[0] ? data.user_picture[0].url : ''}`,
                            "target_id": `${data.user_picture[0] ? data.user_picture[0].target_id : ''}`
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    console.log('Done')
                })
        }
    }

    useEffect(() => {
        loadCurrentUserProfile()
    }, [])

    const uploadImage = (sessionToken) => {
        UserProfileServices.uploadUserImage({
            'csrf_token': sessionToken,
            'file_name': selectedImage.name,
            'credentials': userInfo.ps,
            'file': selectedImage
        })
            .then(data => {
                setImagePreviewUrl(data.url)
                updateUser(sessionToken, data.fid)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done uploading image'))
    }

    const updateUser = (csrf_token, imageId) => {
        UserProfileServices.updateUserProfile({
            'user_id': uid,
            'csrf_token': csrf_token,
            'credentials': userInfo.ps,
            'first_name': updatedUserData.field_name.value,
            'last_name': updatedUserData.field_surname.value,
            'target_id': imageId
        })
            .then(data => {
                setLoading(false)
                notify()
            })
            .catch(error => console.log(error))
            .finally(() => {
                console.log('Done Updating user profile')
            })
    }

    const getSessionToken = () => {
        AuthService.getSessionToken()
            .then(data => {
                uploadImage(data)
            }).catch(error => console.log(error))
            .finally(() => console.log('Done fetching token'))
    }

    const callAPI = () => {
        setLoading(true)
        if (selectedImage) {
            getSessionToken()
        } else {
            updateUser()
        }
    }

    return (
        <Container style={{ marginTop: '100px', padding: '80px 0' }} className="d-flex align-items-start justify-content-between">

            <center style={{ borderRadius: '5%', marginBottom: '30px', width: "45%" }}>
                <img src={imagePreviewUrl ?? updatedUserData.user_picture.url} alt="No User Image" className='img-fluid' style={{ height: '500px', width: '500px', borderRadius: '5%', boxShadow: '10px 10px 25px 10px #7974ea' }} />
            </center>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    callAPI()
                }}
                style={{ width: '45%' }}
            >
                <Row className='mb-4'>
                    <Col>
                        <label htmlFor="first-name">Full Name</label>
                        <input
                            type="text"
                            placeholder='First Name'
                            className='form-control'
                            id="first-name"
                            required
                            value={updatedUserData ? updatedUserData.field_name.value : ''}
                            onInput={(e) => {
                                setUpdatedUserData(
                                    {
                                        ...updatedUserData,
                                        "field_name": {

                                            "value": e.target.value
                                        }
                                    }
                                )
                            }}
                        />
                    </Col>
                    <Col>
                        <label htmlFor="last-name" style={{ visibility: 'hidden' }}>Last Name</label>
                        <input
                            type="text"
                            placeholder='Last Name'
                            className='form-control'
                            id="last-name"
                            required
                            value={updatedUserData ? updatedUserData.field_surname.value : ''}
                            onInput={(e) => {
                                setUpdatedUserData(
                                    {
                                        ...updatedUserData,
                                        "field_surname": {
                                            "value": e.target.value
                                        }
                                    }
                                )
                            }}
                        />
                    </Col>
                </Row>
                <Row className='mb-4'>
                    <Col>
                        <label htmlFor="user-image">Upload Image</label>
                        <input
                            type="file"
                            id="user-image"
                            className='form-control'
                            onChange={(e) => {
                                setSelectedImage(e.target.files[0])
                            }} />
                    </Col>
                    <Col className='text-start'>
                        {selectedImage && (
                            <div className='position-relative'>
                                {/* Display the selected image */}
                                <img
                                    alt="not found"
                                    width={"180px"}
                                    height={"180px"}
                                    style={{ borderRadius: '5%' }}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                                <br />
                                {/* Button to remove the selected image */}
                                <button onClick={() => setSelectedImage(null)} className='rounded border-0 bg-transparent position-absolute top-0 right-0'><IoIosClose style={{ height: '40px', width: '40px', color: 'white' }} /></button>
                            </div>
                        )}
                    </Col>
                </Row>
                <center>
                    <div style={{ width: '30%' }}>
                        <button className='w-100 btn btn-primary'
                            disabled={isLoading}
                        >
                            {
                                isLoading ?

                                    <i>Updating ..</i>

                                    :

                                    'Update'
                            }

                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                            />
                        </button>
                    </div>
                </center>


            </form>
        </Container>
    )
}

export default EditUser
