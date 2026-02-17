import '../Styles/DashboardStyle.css'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { UserProfileServices } from '../Services/UserProfileServices'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '@mui/material/Pagination';
import { LuEye } from "react-icons/lu";
import { LiaEdit } from "react-icons/lia";
import Loading from '../Components/Loading';
import { MdDeleteOutline } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

const UsersList = () => {
    const notify = () => toast.success('User Deleted successfully', {
        duration: 2000,
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

    const [usersList, setUsersList] = useState([])
    const copyUsersList = useRef([])
    const [pageCount, setPageCount] = useState()
    const [isLoading, setLoading] = useState(true)
    let [currentPageNum, setCurrentPageNum] = useState(0)

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))
    if (!userInfo) {
        return <Navigate to="/" replace />
    }
    const getUserProfile = (user_id) => {
        UserProfileServices.getUserProfile({
            'user_id': user_id,
            'credentials': userInfo.ps
        })
            .then(data => {
                let newItem = {
                    "user_id": data.uid[0].value,
                    "user_name": data.name[0].value,
                    "user_image_url": data.user_picture[0] ? data.user_picture[0].url : ''
                }

                setUsersList(prev => {
                    // Check if the newItem's ID is already in the array
                    const isDuplicate = prev.some(item => item.user_id === newItem.user_id);

                    if (!isDuplicate) {
                        // If not a duplicate, return a new array with the new item appended
                        return [...prev, newItem];
                    }
                    // If it is a duplicate, return the original state (or just the prevItems)
                    return prev;
                })

                copyUsersList.current.push(newItem)

            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done fetching user profile'))
    }

    const loadUsersList = () => {
        setLoading(true)
        setUsersList([])
        copyUsersList.current = []
        UserProfileServices.getAllUsers({
            'credentials': userInfo.ps,
            'page_number': currentPageNum
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
            .finally(() => {
                console.log('Done fetching all users')
            })
    }

    const deleteUser = (user_id) => {
        setLoading(true)
        UserProfileServices.deleteUser({
            "user_id": user_id,
            "csrf_token": userInfo.csrf_token,
            "credentials": userInfo.ps
        })
            .then(data => {
                notify()
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

    useEffect(() => {
        loadUsersList()
    }, [currentPageNum])

    const filterUsers = (searchVal) => {
        let filterdUsers = [...copyUsersList.current]
        setUsersList([
            ...filterdUsers.filter(user => {
                return user.user_name.toLowerCase().includes(searchVal.toLowerCase())
            })
        ])

    }

    return (
        <Container className="users-container">

            < center className="mb-4" >
                <input type="search" name="user-search" id="user-search" className="form-control border-0 w-25 p-2" placeholder="Search.." style={{ backgroundColor: "#d9e2e7", color: "#422727ff", fontSize: "20px" }} onInput={e => filterUsers(e.target.value)} />
            </center >
            <Row>
                {
                    (isLoading) ?
                        <Loading />
                        :
                        usersList.map(item => (
                            <Col lg={3} md={4} sm={6} className='user-item mb-4' data-aos="fade-up" data-aos-delay="500" data-aos-duration="400" data-aos-easing="linear">
                                <div className='p-3 rounded  h-100'>
                                    <h4>{item.user_name}</h4>
                                    <div className='h-75 img-container'>
                                        <img src={item.user_image_url} alt="No user image" className='img-fluid w-100 h-100' />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-end icons-container">
                                        <a href={`/users/${item.user_id}`} target="_blank" title='Show User'><LuEye /></a>
                                        <a href={`/users/edit/${item.user_id}`} target="_blank" title='Edit User'><LiaEdit style={{ color: '#444647ff' }} /></a>
                                        <button className="border-0 p-0" title="Delete User" onClick={() => deleteUser(item.user_id)} style={{ backgroundColor: 'transparent' }}>
                                            <MdDeleteOutline />
                                            <Toaster
                                                position="top-right"
                                                reverseOrder={false}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        ))
                }

            </Row>

            <Pagination count={pageCount} variant="outlined" color="primary" className="mt-4" style={{ justifyContent: 'center !important' }} onChange={e => {
                if (e.currentTarget.getAttribute('aria-label').includes('next'))
                    setCurrentPageNum(prev => prev + 1)
                else if (e.currentTarget.getAttribute('aria-label').includes('previous'))
                    setCurrentPageNum(prev => prev - 1)
                else
                    setCurrentPageNum(parseInt(e.target.innerText) - 1)
            }} />
        </Container>
    )
}

export default UsersList
