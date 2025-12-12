import '../Styles/DashboardStyle.css'
import React, { useEffect, useState } from 'react'
import { UserProfileServices } from '../Services/UserProfileServices'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '@mui/material/Pagination';
import { LuEye } from "react-icons/lu";
import { LiaEdit } from "react-icons/lia";
import Loading from '../Components/Loading';
import { MdDeleteOutline } from "react-icons/md";
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { faLess } from '@fortawesome/free-brands-svg-icons';

const UsersList = () => {
    const notify = () => toast("User Deleted Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
    })

    const [usersList, setUsersList] = useState([])
    const [pageCount, setPageCount] = useState()
    const [isLoading, setLoading] = useState(true)
    let [currentPageNum, setCurrentPageNum] = useState(0)

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

    const getUserProfile = (user_id) => {
        UserProfileServices.getUserProfile({
            'user_id': user_id,
            'credentials': userInfo.ps
        })
        .then(data => {
            setUsersList(prev => prev.concat({
                    "user_id": data.uid[0].value,
                    "user_name": data.name[0].value,
                    "user_image_url": data.user_picture[0] ? data.user_picture[0].url : ''
                })
            )
        })
        .catch(error => console.log(error))
        .finally(() => console.log('Done fetching user profile'))
    }

    const loadUsersList = (page_number) => {
        setLoading(true)
        UserProfileServices.getAllUsers({
            'credentials': userInfo.ps,
            'page_number': page_number
        })
        .then(data => {
            setUsersList([])
            setPageCount(data.pager.total_pages)
            data.rows.forEach(element => {
                getUserProfile(element.uid)
            })
            setLoading(false)
        })
        .catch(error => console.log(error))
        .finally(() => console.log('Done fetching all users')) 
    }

    const deleteUser = (user_id) => {
        notify()
        setLoading(true)
        UserProfileServices.deleteUser({
            "user_id": user_id,
            "csrf_token": userInfo.csrf_token,
            "credentials": userInfo.ps
        })
        .then(data => {
            loadUsersList(currentPageNum)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
        .finally(() => console.log('Done Deleting User'))
    }

    useEffect(() => {
        loadUsersList()
    }, [])

    return (
        <Container className="users-container">
            <Row>
                {
                    (isLoading) ?
                        <Loading />
                        :
                        usersList.map(item => (
                            <Col lg={3} md={4} sm={6} className='user-item mb-4'>
                                <div className='p-3 rounded  h-100'>
                                    <h4>{item.user_name}</h4>
                                    <div style={{ height: "75%"}} className='img-container'>
                                        <img src={item.user_image_url} alt="No user image" className='img-fluid w-100 h-100' />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-end icons-container">
                                        <a href={`/users/${item.user_id}`} target="_blank" title='Show User'><LuEye /></a>
                                        <a href={`/users/edit/${item.user_id}`} target="_blank" title='Edit User'><LiaEdit style={{ color: '#444647ff' }} /></a>
                                        <button className="border-0 p-0" title="Delete User" onClick={() => deleteUser(item.user_id)} style={{ backgroundColor: 'transparent' }}>
                                            <MdDeleteOutline />
                                            <ToastContainer
                                                position="top-right"
                                                autoClose={2000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick={false}
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                                pauseOnHover
                                                theme="dark"
                                                transition={Bounce}
                                                className="app-toast-container"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        ))

                }
            </Row>
            <Pagination count={pageCount} variant="outlined" color="primary" className="mb-4 mt-4" style={{ justifyContent: 'center !important' }} onChange={e => {
                if (e.currentTarget.getAttribute('aria-label').includes('next')) {
                    loadUsersList(currentPageNum + 1)
                    setCurrentPageNum(prev => prev + 1)
                }
                else if (e.currentTarget.getAttribute('aria-label').includes('previous')) {
                    loadUsersList(currentPageNum - 1)
                    setCurrentPageNum(prev => prev - 1)
                }
                else {
                    loadUsersList(parseInt(e.target.innerText) - 1)
                    setCurrentPageNum(parseInt(e.target.innerText) - 1)
                }
            }} />
        </Container>
    )
}

export default UsersList
