import React, { useContext, useEffect, useState } from 'react'
import '../Styles/LoginStyle.css'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { AuthContext } from '../Contexts/AuthContext'
import { useNavigate } from 'react-router'
import { AuthService } from '../Services/AuthService'
import tablet from '../assets/tablet.jpg'
import plant from '../assets/plant.jpg'
import buisenessMan from '../assets/buisenessMan.jpg'
import feather from '../assets/feather.png'
import longVector from '../assets/longVector.png'
import shortVector from '../assets/shortVector.png'
import search from '../assets/search.png'
import facebook from '../assets/facebook.png'
import apple from '../assets/apple.png'
import heading from '../assets/Heading.png'

const NewLogin = () => {
    const [loginData, setLoginData] = useState(
        {
            "name": "",
            "pass": ""
        }
    )

    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const { userInfo, setUserInfo, isInitialized } = useContext(AuthContext)

    const [loggedin, setLoggedIn] = useState(false)

    const navigate = useNavigate()

    const callAPI = () => {

        setLoading(true)
        setError(null)

            AuthService.loginUser(loginData.name, loginData.pass)
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message)
                    })
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)

                const userData = {
                    'username': data.current_user.name,
                    'user_id': data.current_user.uid,
                    'csrf_token': data.csrf_token,
                    'logout_token': data.logout_token
                }

                localStorage.setItem('theUserData', JSON.stringify(userData))

                setUserInfo({
                    ...userData,
                    'ps': btoa(`${loginData.name}:${loginData.pass}`),
                })

                setLoggedIn(true)

            })
            .catch((err) => {
                console.log(err)
                setError(err.message)
            })
            .finally(() => {
                console.log("Ended")
                setLoading(false)
            })


    }
    const loadCurrentUserProfile = () => {
        if (userInfo) {
            AuthService.getCurrentUsrProfile({
                userId: userInfo.user_id,
                credentials: userInfo.ps,
            })
                .then((data) => {
                    console.log(data)

                    const userData_update = {
                        ...userInfo,
                        'firstName': data.field_name[0].value,
                        'lastName': data.field_surname[0].value,
                        'email': data.mail[0].value,
                    }
                    setUserInfo(userData_update)

                    localStorage.setItem('theUserData', JSON.stringify(userData_update))

                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    navigate('/')
                })
        }
    }

    useEffect(() => {
        loadCurrentUserProfile()
    }, [loggedin]) // changed into "loggedin" state as dependency, because if we use userInfo state, the api will go into infinte loop

    if (isInitialized) {
        return (
            <></>
        )
    }

    return (
        <div className='login d-flex align-items-center justify-content-between flex-wrap'>
            <div className='position-relative h-100 w-50' style={{ backgroundColor: '#F3EFFE' }}>
                <img src={tablet} alt="" className='position-absolute' />
                <img src={plant} alt="" className='position-absolute' />
                <img src={buisenessMan} alt="" className='position-absolute' />
                <img src={feather} alt="" className='position-absolute' />
                <img src={longVector} alt="" className='position-absolute' />
                <img src={shortVector} alt="" className='position-absolute' />
            </div>
            <div className='w-50'>
                <h1 className='text-center text text-primary'>Sign in to your account</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        callAPI()
                    }}
                >
                    <div className='mb-3'>
                        <label htmlFor="userName" className='text text-secondary mb-2'>Username</label>
                        <input
                            type="text"
                            placeholder='Username or email address...'
                            id="userName"
                            className='form-control'

                            onInput={(e) => {

                                setLoginData(
                                    {
                                        ...loginData,
                                        'name': e.target.value

                                    }
                                )

                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='text text-secondary mb-2'>Password</label>
                        <input
                            type="password"
                            placeholder='Password'
                            className='form-control'
                            id="password"
                            onInput={(e) => {

                                setLoginData(
                                    {
                                        ...loginData,
                                        'pass': e.target.value
                                    }
                                )

                            }}
                        />
                    </div>

                    {
                        error ?
                            <div className='mb-3 alert alert-warning'>
                                {error}
                            </div>
                            :
                            ''
                    }

                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <div class="form-check w-25">
                            <input type="checkbox" value="" id="rememberMe" class="form-check-input" />
                            <label class="form-check-label" for="rememberMe">
                                Remember me
                            </label>
                        </div>
                        <button className='w-25 btn btn-primary'
                            disabled={loading || loginData.name.length < 3 || loginData.pass.length < 6}
                        >

                            {
                                loading ?
                                    <i>Logging in...</i>
                                    :
                                    'Sign In ->'
                            }
                        </button>

                    </div>

                </form>
                <img src={heading} alt="" className='sing-in-methods-tag w-100'/>
                <div className="d-flex justify-content-between align-items-center sign-in-methods-container mt-5 flex-wrap">
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

export default NewLogin