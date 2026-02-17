import '../App.css'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

import { NavLink } from "react-router";
import { GrLanguage } from "react-icons/gr";

import { AuthContext } from '../Contexts/AuthContext';
import logo from '../assets/logo.png'

import '../i18n';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../Services/AuthService';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function ColorSchemesExample({ currentPage }) {
    const [userImageUrl, setUserImageUrl] = useState('')

    const { userInfo, setUserInfo, isInitialized } = useContext(AuthContext)

    const navigate = useNavigate()

    const { t, i18n } = useTranslation('common');

    const changeLanguage = () => {
        const currentLang = i18n.language;
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);

        document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', newLang);
    };

    function getCurrentUserImageUrl() {
        if (userInfo) {
            AuthService.getCurrentUsrImage({
                userId: userInfo.user_id,
                credentials: userInfo.ps,
            })
                .then(data => {
                    setUserImageUrl(data)
                })
                .catch(error => console.log(error))
                .finally(() => console.log('Done'))
        }
    }

    function logout(event) {
        event.preventDefault()
        localStorage.removeItem('theUserData')
        setUserInfo(null)
        navigate("/")
    }

    useEffect(() => {
        getCurrentUserImageUrl()
    }, [userInfo])

    return (
        (currentPage.includes('/dashboard')) ?
            <></>
            :
            <>
                <Navbar data-bs-theme="dark" key="lg" expand="lg" style={{ backgroundColor: '#6341AF', boxShadow: '0 8px 10px #735af0ff', position: 'fixed', top: '0', right: '0', left: '0', zIndex: '10', padding: '10px 0', marginBottom: '100px' }}>
                    <Container>
                        <Navbar.Brand href="#home">
                            <img src={logo} alt="" style={{ height: '100%' }} />
                        </Navbar.Brand>
                        {
                            currentPage !== '/login' && currentPage !== '/register' ?
                                <>
                                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                                    <Navbar.Offcanvas
                                        id={`offcanvasNavbar-expand-lg`}
                                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                                        placement="end"
                                        className="custom-offcanvas"
                                    >
                                        <Offcanvas.Header closeButton style={{ backgroundColor: '#6341AF' }}>
                                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                                <img src={logo} alt="" style={{ height: '40px' }} />
                                            </Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body className="align-items-center" style={{ backgroundColor: '#6341AF', fontSize: '20px' }}>
                                            <Nav className="me-auto my-2 my-lg-0">

                                                <div>
                                                    <NavLink to="/" className={({ isActive }) =>
                                                        `nav-link ${isActive ? " active" : ""}`
                                                    }>{t('Home')}</NavLink>
                                                    <p></p>
                                                </div>

                                                <div>
                                                    <NavLink to="blogsList"
                                                        className={({ isActive }) =>
                                                            `nav-link ${isActive ? " active" : ""}`
                                                        }
                                                        style={{ pointerEvents: `${!userInfo ? "none" : ""}` }}
                                                    >{t('Articles')}</NavLink>
                                                    <p></p>
                                                </div>

                                                <div>
                                                    <NavLink to="vacancies"
                                                        className={({ isActive }) =>
                                                            `nav-link ${isActive ? " active" : ""}`
                                                        }>{t('Vacanceis')}</NavLink>
                                                    <p></p>
                                                </div>

                                                <div>
                                                    <NavLink to="about-us" className={({ isActive }) =>
                                                        `nav-link ${isActive ? " active" : ""}`
                                                    }>{t('About us')}</NavLink>
                                                    <p></p>
                                                </div>

                                                <div>
                                                    <NavLink to="contact-us" className={({ isActive }) =>
                                                        `nav-link ${isActive ? " active" : ""}`
                                                    }>{t('Contact')}</NavLink>
                                                    <p></p>
                                                </div>

                                                {
                                                    (userInfo) ?
                                                        <div className='user-links d-none'>
                                                            <div>
                                                                <NavLink to={`users/edit/${userInfo.user_id}`} className={({ isActive }) =>
                                                                    `nav-link ${isActive ? " active" : ""}`
                                                                }>{t('My Account')}</NavLink>
                                                                <p></p>
                                                            </div>
                                                            <div>
                                                                <NavLink to="/" className={({ isActive }) =>
                                                                    `nav-link ${isActive ? "" : ""}`
                                                                } onClick={e => logout(e)}>{t('Logout')}</NavLink>
                                                                <p></p>
                                                            </div>
                                                        </div>
                                                        :
                                                        <></>
                                                }
                                            </Nav>

                                            {
                                                (isInitialized)
                                                    ? <></>
                                                    :
                                                    (!userInfo) ?

                                                        <Nav className='d-flex' style={{ alignItems: 'center', gap: '15px' }}>
                                                            <NavLink to="login" className='btn bg-transparent sign-in' >{t('Sign in')}</NavLink>
                                                            <NavLink to="register" className="btn border bg-white create-account">{t('Create Account')}</NavLink>
                                                        </Nav>

                                                        :

                                                        <div className='d-flex align-items-center user-info' style={{ gap: '5px' }}>
                                                            <Dropdown className="user-dropDown">
                                                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none', fontSize: '20px' }}>
                                                                    {userInfo.firstName} {userInfo.lastName}
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu className='dropDown-options'>
                                                                    <Dropdown.Item href={`/users/edit/${userInfo.user_id}`} >My Account</Dropdown.Item>
                                                                    <Dropdown.Item href="/" onClick={e => logout(e)}>Logout</Dropdown.Item>
                                                                    <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                            <div style={{ borderRadius: '50%', height: '60px', width: '60px' }}>
                                                                <img src={userImageUrl} alt="No user image" className='img-fluid h-100 w-100' style={{ borderRadius: '50%' }} />
                                                            </div>
                                                        </div>
                                            }
                                        </Offcanvas.Body>
                                    </Navbar.Offcanvas>
                                </>
                                :
                                <>
                                    {
                                        (currentPage === '/login') ?
                                            <Nav className='d-flex' style={{ alignItems: 'center', gap: '15px' }}>
                                                <span style={{ fontSize: '22px', fontWeight: '400', color: '#FFFFFF' }}>Don't have an account?</span>
                                                <NavLink to="register" className="btn border bg-white create-account">{t('Create Account')}</NavLink>
                                            </Nav>
                                            :
                                            <Nav className='d-flex' style={{ alignItems: 'center', gap: '15px' }}>
                                                <span style={{ fontSize: '22px', fontWeight: '400', color: '#FFFFFF' }}>Already have an account ?</span>
                                                <NavLink to="login" className='btn bg-transparent sign-in'>{t('Sign in')}</NavLink>
                                            </Nav>
                                    }

                                </>
                        }
                    </Container>
                </Navbar>
            </>
    );
}

export default ColorSchemesExample;