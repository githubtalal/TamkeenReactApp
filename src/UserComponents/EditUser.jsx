import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { AuthService } from '../Services/AuthService'
import { UserProfileServices } from '../Services/UserProfileServices'
//import { Bounce, toast, ToastContainer } from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';
import { IoMdCloseCircle } from "react-icons/io";

const EditUser = () => {
    const notify = () => toast.success('User updated successfully', {
        duration: 4000,
        // Styling
        style: {
            color: '#5f3fadff',
            fontSize: '20px'
        },
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#463c6dff',
            secondary: '#bdb7cdff',
            height: '60px',
            width: '60px'
        }
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
    if (!userInfo) {
        return <Navigate to="/" replace />
    }

    const [selectedImage, setSelectedImage] = useState(null);

    const [imagePreviewUrl, setImagePreviewUrl] = useState()


    const [updatedUserData, setUpdatedUserData] = useState(

        {
            "name":
            {
                "value": ""
            },
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
                        "name":
                        {
                            "value": `${data.name[0] ? data.name[0].value : ""}`
                        },
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
                document.getElementById("user-update").reset()
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
        <Container style={{ marginTop: '100px', padding: '80px 0' }} className='user-update-container'>
            <h1 className="text-center text text-primary mb-4">{updatedUserData.name.value}</h1>
            <div className="d-flex align-items-start justify-content-between">

                <img src={imagePreviewUrl ?? updatedUserData.user_picture.url} alt="No User Image" className='img-fluid' style={{ height: '500px', width: '500px', borderRadius: '5%', boxShadow: '10px 10px 25px 10px #7974ea' }} />

                <form id="user-update"
                    onSubmit={(e) => {
                        e.preventDefault()
                        callAPI()
                    }}
                    style={{ width: '45%' }}
                >
                    <Row className='mb-4'>
                        <Col>
                            <label htmlFor="first-name" className='text text-secondary'>Full Name</label>
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
                            <label htmlFor="user-image" className='text text-secondary'>Upload Image</label>
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
                                    <button onClick={() => setSelectedImage(null)} className='remove-img rounded border-0 bg-transparent position-absolute top-0 right-0'><IoMdCloseCircle style={{ height: '30px', width: '30px', color: '#1e193dff', backgroundColor: '#ffffff', borderRadius: '50%' }} /></button>
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
            </div>

        </Container>
    )
}

export default EditUser
