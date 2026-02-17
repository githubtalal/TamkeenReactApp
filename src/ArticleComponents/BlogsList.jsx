import React, { useContext, useEffect, useState } from 'react'
import { ArticlesServices } from '../Services/ArticlesServices'
import { Container, Row, Col } from 'react-bootstrap'
import blueFeather from '../assets/blueFeather.png'
import { ApiConfig } from '../API/ApiConfig'
import Loading from '../Components/Loading'
import Pagination from '@mui/material/Pagination'
import { MdAddBox } from "react-icons/md";
import { CategoriesServices } from '../Services/CategoriesServices'
import { IoIosClose } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { LiaEdit } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom'

const BlogsList = () => {
    const notify = () => toast.success('Article Deleted successfully', {
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
    const [blogsList, setBlogsList] = useState([])
    const [isLoading, setLoading] = useState(false)
    let [currentPageNum, setCurrentPageNum] = useState(0)
    const [pageCount, setPageCount] = useState()
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [searchQuery, setSearchQuery] = useState()
    const [blogCategory, setBlogCategory] = useState()
    const [blogTag, setBlogTag] = useState()



    const userInfo = JSON.parse(localStorage.getItem('theUserData'))
    if (!userInfo) {
        return <Navigate to="/" replace />
    }

    const loadBlogsList = () => {
        setLoading(true)
        setBlogsList([])
        ArticlesServices.getBlogs({
            "credentials": userInfo.ps,
            "page_number": currentPageNum,
            "searchQuery": searchQuery,
            "category": blogCategory,
            "tag": blogTag
        })
            .then(data => {
                setPageCount(data.pager.total_pages)
                setBlogsList(data.rows)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
            .finally(() => console.log('Done'))
    }

    const loadCategories = () => {
        CategoriesServices.getCategories()
            .then(data => setCategories(data))
            .catch(error => console.log(error))
            .finally(() => console.log('Done categories'))
    }

    const loadTags = () => {
        ArticlesServices.getTags()
            .then(data => setTags(data))
            .catch(error => console.log(error))
            .finally(() => console.log('Done tags'))
    }

    const deleteBlog = (aid) => {
        setLoading(true)
        ArticlesServices.deleteArticle({
            "articleId": aid,
            "csrf_token": userInfo.csrf_token,
            "credentials": userInfo.ps
        })
            .then(data => {
                loadBlogsList(currentPageNum)
                notify()
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
            .finally(() => {
                console.log('Deleted Article Done')
            })
    }

    useEffect(() => {
        loadBlogsList()
        loadCategories()
        loadTags()
    }, [])

    useEffect(() => {
        loadBlogsList()
    }, [searchQuery, blogCategory, blogTag, currentPageNum, pageCount])


    return (
        <Container className='blogs-container' style={{ marginTop: '150px' }}>
            <center className="mb-4 d-flex justify-content-between align-items-center">
                <input type="search" name="blog-search" id="blog-search" className="form-control border-0 w-25 p-2" placeholder="Search.." style={{ backgroundColor: "#d9e2e7", color: "#422727ff", fontSize: "20px" }} value={searchQuery} onInput={e => setSearchQuery(e.target.value)} />
                <div className="d-flex align-items-center justify-content-between" style={{ gap: '15px' }}>
                    {
                        (blogCategory) ?
                            <div className='d-flex align-items-center justify-content-between rounded px-2' style={{ backgroundColor: '#c1d0d7' }}>
                                <span>{document.getElementById(`cat_${blogCategory}`).value}</span>
                                <button className='border-0 bg-transparent' onClick={() => {
                                    document.getElementById(`cat_${blogCategory}`).checked = false
                                    setBlogCategory(null)
                                }}><IoIosClose style={{ color: '#637173ff', height: '40px', width: '40px' }} /></button>
                            </div>
                            :
                            ""
                    }

                    {
                        (blogTag) ?
                            <div className='d-flex align-items-center justify-content-between rounded px-2' style={{ backgroundColor: '#c1d0d7' }}>
                                <span>{document.getElementById(`tag_${blogTag}`).value}</span>
                                <button className='border-0 bg-transparent' onClick={() => {
                                    document.getElementById(`tag_${blogTag}`).checked = false
                                    setBlogTag(null)
                                }}><IoIosClose style={{ color: '#637173ff', height: '40px', width: '40px' }} /></button>

                            </div>
                            :
                            ""
                    }
                </div>
                <a href='/blogs/create' target='_blank'><MdAddBox style={{ height: '70px', width: '70px', color: '#349aacff' }} /></a>
            </center>
            <div className="d-flex align-items-start justify-content-between flex-wrap">
                <div className="filter-terms" style={{ width: '10%' }}>
                    <div>
                        <span className='fw-bold text-text-primary' style={{ fontSize: '30px', color: '#1d3d6cff' }}>Category</span><br />
                        {
                            categories.map(category => (
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id={`cat_${category.id}`} checked={blogCategory === category.id} value={category.name} onChange={e => {
                                        if (e.target.checked) setBlogCategory(e.target.id.split('_')[1])
                                        else setBlogCategory(null)
                                    }}></input>
                                    <label class="form-check-label" for={`cat_${category.id}`} style={{ fontSize: '20px', textTransform: 'capitalize', color: '#4b5461ff' }}>{category.name}</label>
                                </div>
                            ))
                        }
                    </div>

                    <div>
                        <span className='fw-bold text-text-primary' style={{ fontSize: '30px', color: '#1d3d6cff' }}>Tag</span><br />
                        {
                            tags.map(tag => (
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id={`tag_${tag.id}`} checked={blogTag === tag.id} value={tag.name} onChange={e => {
                                        if (e.target.checked) setBlogTag(e.target.id.split('_')[1])
                                        else setBlogTag(null)
                                    }}></input>
                                    <label class="form-check-label" for={`tag_${tag.id}`} style={{ fontSize: '20px', textTransform: 'capitalize', color: '#4b5461ff' }}>{tag.name}</label>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <Row style={{ width: '90%' }}>
                    {
                        (isLoading) ?
                            <Loading />
                            :
                            blogsList.map(blog => (
                                <Col className='mb-4' sm={12} md={6} lg={3} data-aos="fade-up" data-aos-delay="200" data-aos-duration="500" data-aos-easing="linear">
                                    <div className="p-3 rounded article-card h-100">
                                        <div>
                                            <img src={ApiConfig.BASE_URL_TAMKEEN + blog.field_image} alt="No image from Api" className='img-fluid rounded h-100 w-100' />
                                        </div>
                                        <div className='h-50'>
                                            <h6>{blog.title}</h6>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='d-flex align-items-center'>
                                                    <div style={{ height: '40px', width: '40px' }}>
                                                        <img src={blueFeather} alt="" className='img-fluid h-100 w-100' />
                                                    </div>
                                                    <span>{blog.author}</span>
                                                </div>
                                                <div className="d-flex align-items-center icons-container">
                                                    <a href={`/articles/${blog.id}`} target="_blank" title='Show Aricle'><LuEye /></a>
                                                    {
                                                        (blog.author === userInfo.username) ?
                                                            <>
                                                                <a href={`/articles/edit/${blog.id}`} target="_blank" title='Edit Article'><LiaEdit style={{ color: '#444647ff' }} /></a>
                                                                <button className="border-0 p-0" title="Delete article" onClick={() => deleteBlog(blog.id)} style={{ backgroundColor: 'transparent' }}>
                                                                    <MdDeleteOutline />
                                                                    <Toaster
                                                                        position="top-right"
                                                                        reverseOrder={false}
                                                                    />
                                                                </button>
                                                            </>
                                                            :
                                                            <></>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                    }
                </Row>
            </div>


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

export default BlogsList