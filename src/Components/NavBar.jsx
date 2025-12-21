import { useContext, useEffect, useState } from 'react';
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


function ColorSchemesExample({ currentPage }) {
    const [userImageUrl, setUserImageUrl] = useState('')

    const { userInfo, setUserInfo, isInitialized } = useContext(AuthContext)

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

    function logout() {
        localStorage.removeItem('theUserData')
        setUserInfo(null)
    }

    useEffect(() => {
        getCurrentUserImageUrl()
    }, [userInfo])

    return (
        (currentPage.includes('/dashboard')) ?
            <></>
            :
            <>
                <Navbar data-bs-theme="dark" style={{ backgroundColor: '#6341AF', boxShadow: '0 8px 10px #735af0ff', position: 'fixed', top: '0', right: '0', left: '0', zIndex: '10', padding: '20px 0', marginBottom: '100px' }}>
                    <Container>
                        <Navbar.Brand href="#home">
                            <img src={logo} alt="" style={{ height: '40px' }} />
                        </Navbar.Brand>
                        {
                            currentPage !== '/login' && currentPage !== '/register' ?

                                <Nav className="me-auto">

                                    <div>
                                        <NavLink to="/" className={({ isActive }) =>
                                            `nav-link ${isActive ? " active" : ""}`
                                        }>{t('Home')}</NavLink>
                                        <p></p>
                                    </div>

                                    <div>
                                        <NavLink to="articlesList"
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

                                </Nav> : <></>
                        }

                        <div className='d-flex'>

                            <button
                                className='lang border-0 bg-transparent'
                                onClick={() => changeLanguage()}
                                style={{ margin: '0 10px', padding: '10px 20px' }}
                            >
                                <div className="d-flex" style={{ gap: '7px', alignItems: 'center' }}>
                                    {i18n.language === 'en' ? 'العربية' : 'english'}
                                    <GrLanguage />
                                </div>
                            </button>

                            {
                                (isInitialized)
                                    ? <></>
                                    :
                                    (!userInfo)
                                        ? (currentPage === '/login') ?
                                            <Nav className='d-flex' style={{ alignItems: 'center', gap: '15px' }}>
                                                <span style={{ fontSize: '22px', fontWeight: '400', color: '#FFFFFF' }}>Don't have an account?</span>
                                                <NavLink to="register" className="btn border bg-white" style={{ color: '#242424', borderRadius: '14px', padding: '10px 16px' }}>{t('Create Account')}</NavLink>
                                            </Nav>
                                            : (currentPage === '/register') ?
                                                <Nav className='d-flex' style={{ alignItems: 'center', gap: '15px' }}>
                                                    <span style={{ fontSize: '22px', fontWeight: '400', color: '#FFFFFF' }}>Already have an account ?</span>
                                                    <NavLink to="login" className='btn bg-transparent' style={{ border: '1px solid #FFFFFF', padding: '10px 32px', borderRadius: '14px', padding: '10px 32px' }}>{t('Sign in')}</NavLink>
                                                </Nav>
                                                :
                                                <Nav className='d-flex' style={{ alignItems: 'center', gap: '15px' }}>
                                                    <NavLink to="login" className='btn bg-transparent' style={{ border: '1px solid #FFFFFF', padding: '10px 32px', borderRadius: '14px', padding: '10px 32px' }}>{t('Sign in')}</NavLink>
                                                    <NavLink to="register" className="btn border bg-white" style={{ color: '#242424', borderRadius: '14px', padding: '10px 16px' }}>{t('Create Account')}</NavLink>
                                                </Nav>

                                        :

                                        <div className='d-flex align-items-center' style={{ gap: '5px' }}>
                                            <Dropdown className="user-dropDown">
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'transparent', border: 'none' }}>
                                                    {userInfo.firstName} {userInfo.lastName}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className='dropDown-options'>
                                                    <Dropdown.Item href={`users/edit/${userInfo.user_id}`} >My Account</Dropdown.Item>
                                                    <Dropdown.Item href="/articlesList" >My Articles</Dropdown.Item>
                                                    <Dropdown.Item href="/login" onClick={logout}>Logout</Dropdown.Item>
                                                    <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <div style={{ borderRadius: '50%', height: '60px', width: '60px' }}>
                                                <img src={userImageUrl} alt="No user image" className='img-fluid h-100 w-100' style={{ borderRadius: '50%' }} />
                                            </div>
                                        </div>
                            }
                        </div>
                    </Container>
                </Navbar>


            </>
    );
}

export default ColorSchemesExample;