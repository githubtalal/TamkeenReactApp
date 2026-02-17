import React from 'react'
import { useState, useEffect } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { AuthService } from '../Services/AuthService';

const SideBar = ({ currentPage }) => {
    const [userImageUrl, setUserImageUrl] = useState('')

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

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
    
    const addActiveClass = (event) => {
        let activeItem = document.querySelector('.side-bar li.active')
        if (activeItem) {
            activeItem.classList.remove('active')
        }
        event.target.closest('li').classList.add('active')
    }

    useEffect(() => {
        getCurrentUserImageUrl()
    }, [])

    return (
        <>

            <Sidebar className='side-bar'>
                <div className="user-profile position-absolute text-center w-100">
                    <center>
                        <img src={userImageUrl} alt="No user image" className="img-fluid h-100 w-100" />
                    </center>
                    <p className='p-0'>{userInfo.firstName} {userInfo.lastName}</p>
                </div>
                <Menu style={{ marginTop: '160px' }}>
                    <MenuItem className={currentPage.includes('usersList') ? "rounded active" : "rounded"} component={<Link to="/dashboard/usersList" />} onClick={e => addActiveClass(e)}>Users List</MenuItem>
                    <MenuItem className={currentPage.includes('articlesList') ? "rounded active" : "rounded"} component={<Link to="/dashboard/articlesList" />} onClick={e => addActiveClass(e)}>Articles List</MenuItem>
                    <MenuItem className={currentPage.includes('testimonialsList') ? "rounded active" : "rounded"} component={<Link to="/dashboard/testimonialsList" />} onClick={e => addActiveClass(e)}>Testimonials List</MenuItem>
                </Menu>
            </Sidebar>
        </>
    )
}

export default SideBar
