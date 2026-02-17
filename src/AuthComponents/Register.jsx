import React, { useEffect, useState, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router';
import search from '../assets/search.png'
import facebook from '../assets/facebook.png'
import apple from '../assets/apple.png'
import heading from '../assets/Heading.png'
import tablet from '../assets/tablet.jpg'
import plant from '../assets/plant.jpg'
import buisenessMan from '../assets/buisenessMan.jpg'
import feather from '../assets/feather.png'
import longVector from '../assets/longVector.png'
import shortVector from '../assets/shortVector.png'
import { AuthService } from '../Services/AuthService';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const notify = () => toast.success('User created successfully go to your email for activation', {
        duration: 5000,
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

    const { userInfo, isInitialized } = useContext(AuthContext)
    const navigate = useNavigate()


    const [registerData, setRegisterData] = useState(

        {
            "name": {
                "value": ""
            },
            "field_name": {
                "value": ""
            },
            "field_surname": {
                "value": ""
            },
            "mail": {
                "value": ""
            },
            "field_mobile": {
                "value": ""
            },
            // "field_gender": {
            //    "target_id": 9
            // },
            // "field_skills": {
            //     "target_ids": []
            // },
            // "field_how_did_you_find_us": [],
            "pass": {
                "value": ""
            }
        }

    )

    const [error, setError] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const [registerSuccess, setRegisterSuccess] = useState()

    const [showHide, setShowHide] = useState({
        "pass": 'password',
        "confirm": 'password'
    })

    const [passValue, setPassValue] = useState({
        "pass": '',
        "confirm": ''
    })

    const [terms, setTerms] = useState([])

    const callAPI = () => {

        setError(null)

        setIsLoading(true)

        AuthService.registerUser(registerData)
            .then((data) => {
                console.log(data)
                document.getElementById("user-create").reset()
                notify()
                //setRegisterSuccess(data.name[0].value)
            })
            .catch((err) => {
                console.log(err)
                setError(err.message)
            })
            .finally(() => {
                console.log('Ended')

                setIsLoading(false)
            })
    }


    // handle register component with useContext "isInitialized"
    // start ...

    if (isInitialized) {
        return (
            <></>
        )
    }
    // end.

    return (
        <div className='login d-flex align-items-center justify-content-between'>
            <div className='position-relative h-100 w-50' style={{ backgroundColor: '#F3EFFE' }}>
                <img src={tablet} alt="" className='position-absolute' />
                <img src={plant} alt="" className='position-absolute' />
                <img src={buisenessMan} alt="" className='position-absolute' />
                <img src={feather} alt="" className='position-absolute' />
                <img src={longVector} alt="" className='position-absolute' />
                <img src={shortVector} alt="" className='position-absolute' />
            </div>
            <div className='w-50'>
                <h1 className='mt-5 text-center text text-primary'>Create your account</h1>
                <br />
                {
                    error ?
                        <div className='alert alert-warning'>{error}</div>
                        :
                        ''
                }
                <form id="user-create"
                    onSubmit={(e) => {
                        e.preventDefault()
                        callAPI()
                    }}
                >
                    <Row className='mb-3'>
                        <Col>
                            <label htmlFor="first-name" className='text text-secondary'>Full Name</label>
                            <input
                                type="text"
                                placeholder='First Name'
                                className='form-control'
                                id="first-name"
                                required

                                onInput={(e) => {
                                    setRegisterData(
                                        {
                                            ...registerData,
                                            "field_name": {

                                                "value": e.target.value
                                            }
                                        }
                                    )
                                }}
                            />
                        </Col>
                        <Col>
                            <label htmlFor="last-name" style={{ visibility: 'hidden' }} className='text text-secondary'>Last Name</label>
                            <input
                                type="text"
                                placeholder='Last Name'
                                className='form-control'
                                id="last-name"
                                required

                                onInput={(e) => {
                                    setRegisterData(
                                        {
                                            ...registerData,
                                            "field_surname": {
                                                "value": e.target.value
                                            }
                                        }
                                    )
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <label htmlFor="mobile" className='text text-secondary'>Mobile</label>
                            <input
                                type="text"
                                placeholder='ex: 0955 000 000'
                                className='form-control'
                                id="mobile"
                                onInput={(e) => {
                                    setRegisterData(
                                        {
                                            ...registerData,
                                            "field_mobile": {
                                                "value": e.target.value
                                            }
                                        }
                                    )
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <label htmlFor="userName" className='text text-secondary'>Username</label>
                            <input
                                type="text"
                                placeholder='Username'
                                className='form-control'
                                id="userName"
                                required

                                onInput={(e) => {

                                    setRegisterData(
                                        {
                                            ...registerData,
                                            "name": {
                                                "value": e.target.value
                                            }
                                        }
                                    )

                                }}
                            />
                        </Col>

                    </Row>

                    {
                        registerData.name.value &&
                            registerData.name.value.length < 4 ?

                            <div className='alert alert-danger'>
                                username must be more than 3 characters
                            </div>
                            :
                            ""
                    }

                    <Row className='mb-3'>
                        <Col>
                            <label htmlFor="email" className='text text-secondary'>Email</label>
                            <input
                                type="email"
                                placeholder='example@email.com'
                                className='form-control'
                                id="email"
                                required

                                onInput={(e) => {
                                    setRegisterData(
                                        {
                                            ...registerData,
                                            "mail": {
                                                "value": e.target.value
                                            }
                                        }
                                    )
                                }}
                            />
                        </Col>
                    </Row>

                    <Row className='mb-3'>
                        <Col className='position-relative'>
                            <input
                                type={showHide.pass}
                                placeholder='Password'
                                className='form-control'

                                required

                                onInput={(e) => {
                                    setRegisterData(
                                        {
                                            ...registerData,
                                            "pass": {
                                                "value": e.target.value
                                            }
                                        }
                                    )

                                    setPassValue({
                                        ...passValue,
                                        'pass': e.target.value
                                    })
                                }}
                            />

                            <button className='position-absolute eye-icon border-0' type='button' onClick={
                                () => {
                                    setShowHide(
                                        {
                                            ...showHide,
                                            'pass': showHide.pass == 'password' ? 'text' : 'password'
                                        }
                                    )
                                }}>

                                {
                                    showHide.pass == 'password' ?
                                        <BsEyeFill />
                                        :
                                        <BsEyeSlashFill />
                                }



                            </button>
                        </Col>
                        <Col className=' position-relative'>
                            <input
                                type={showHide.confirm}
                                placeholder='Confirm Password'
                                className='form-control'

                                required

                                onInput={(e) => {
                                    setPassValue({
                                        ...passValue,
                                        'confirm': e.target.value
                                    })
                                }}
                            />

                            <button className='position-absolute eye-icon border-0' type='button' onClick={
                                () => {
                                    setShowHide(

                                        {
                                            ...showHide,
                                            'confirm': showHide.confirm == 'password' ? 'text' : 'password'
                                        }
                                    )
                                }}>

                                {
                                    showHide.confirm == 'password' ?
                                        <BsEyeFill />
                                        :
                                        <BsEyeSlashFill />
                                }



                            </button>
                        </Col>
                    </Row>

                    {
                        passValue.confirm
                            ?

                            passValue.confirm !== passValue.pass
                                ?
                                'كلمة المرور غير متطابقة'
                                :
                                "كلمة المرور متطابقة"

                            :

                            ''

                    }

                    <div className="d-flex align-items-center justify-content-between mb-1">
                        <div class="form-check" style={{ width: '70%' }}>
                            <input type="checkbox" value="" id="rememberMe" class="form-check-input" />
                            <label class="form-check-label" for="rememberMe">
                                I Agree with all of your Terms & Conditions
                            </label>
                        </div>

                        <div style={{ width: '30%' }}>
                            <button className='w-100 btn btn-primary'
                                disabled={isLoading || registerData.name.value.length < 4}
                            >
                                {
                                    isLoading ?

                                        <i>Creating in progress</i>

                                        :

                                        'Create Account ->'
                                }
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />
                            </button>
                        </div>
                    </div>
                </form>
                <img src={heading} alt="" className='sing-in-methods-tag w-100' />
                <div className="d-flex justify-content-between align-items-center sign-in-methods-container mt-3 flex-wrap">
                    <a href="https://www.google.com" className='d-flex align-items-center mb-3' target='_blank'>
                        <div>
                            <img src={search} alt="" />
                        </div>
                        <span className='px-4 py-2'>Google</span>
                    </a>
                    <a href="https://www.facebook.com" className='d-flex align-items-center mb-3' target='_blank'>
                        <div>
                            <img src={facebook} alt="" />
                        </div>
                        <span className='px-4 py-2'>Facebook</span>
                    </a>
                    <a href="" className='d-flex align-items-center mb-3' target='_black'>
                        <div>
                            <img src={apple} alt="" />
                        </div>
                        <span className='px-4 py-2'>Apple</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Register

