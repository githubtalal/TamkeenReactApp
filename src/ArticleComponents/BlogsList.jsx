import React, { useEffect, useState } from 'react'
import { ArticlesServices } from '../Services/ArticlesServices'
import { Container, Row, Col } from 'react-bootstrap'
import blueFeather from '../assets/blueFeather.png'
import { ApiConfig } from '../API/ApiConfig'
import Loading from '../Components/Loading'
import Pagination from '@mui/material/Pagination'
import { IoIosAddCircle } from "react-icons/io";
import { CategoriesServices } from '../Services/CategoriesServices'
import { IoIosClose } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { LiaEdit } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';

const BlogsList = () => {
    const notify = () => toast.success('Article Deleted successfully', {
        duration: 2000
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
                console.log(data)
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
                loadArticles(currentPageNum)
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
        <Container className='blogs-container'>
            <center className="mb-4 d-flex justify-content-between align-items-center">
                <input type="search" name="blog-search" id="blog-search" className="form-control border-0 w-25 p-2" placeholder="Search.." style={{ backgroundColor: "#d9e2e7", color: "#422727ff", fontSize: "20px" }} value={searchQuery} onInput={e => setSearchQuery(e.target.value)} />
                <div className="d-flex align-items-center justify-content-between" style={{ gap: '15px' }}>
                    {
                        (blogCategory) ?
                            <div className='d-flex align-items-center justify-content-between rounded px-2' style={{ backgroundColor: '#c1d0d7' }}>
                                <span>{document.getElementById(blogCategory).value}</span>
                                <button className='border-0 bg-transparent' onClick={() => {
                                    document.getElementById(blogCategory).checked = false
                                    setBlogCategory(null)
                                }}><IoIosClose style={{ color: '#637173ff', height: '40px', width: '40px' }} /></button>
                            </div>
                            :
                            ""
                    }

                    {
                        (blogTag) ?
                            <div className='d-flex align-items-center justify-content-between rounded px-2' style={{ backgroundColor: '#c1d0d7' }}>
                                <span>{document.getElementById(blogTag).value}</span>
                                <button className='border-0 bg-transparent' onClick={() => {
                                    document.getElementById(blogTag).checked = false
                                    setBlogTag(null)
                                }}><IoIosClose style={{ color: '#637173ff', height: '40px', width: '40px' }} /></button>

                            </div>
                            :
                            ""
                    }
                </div>
                <a href='/blogs/create' target='_blank'><IoIosAddCircle style={{ height: '60px', width: '60px' }} /></a>
            </center>
            <div className="d-flex align-items-start justify-content-between">
                <div style={{ width: '10%' }}>
                    <span className='fw-bold text-text-primary' style={{ fontSize: '20px' }}>Category</span><br />
                    {
                        categories.map(category => (
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id={category.id} checked={blogCategory === category.id} value={category.name} onChange={e => {
                                    if (e.target.checked) setBlogCategory(e.target.id)
                                    else setBlogCategory(null)
                                }}></input>
                                <label class="form-check-label" for={category.id}>{category.name}</label>
                            </div>
                        ))
                    }
                    <br /><br />
                    <span className='fw-bold text-text-primary' style={{ fontSize: '20px' }}>Tags</span><br />
                    {
                        tags.map(tag => (
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id={tag.id} checked={blogTag === tag.id} value={tag.name} onChange={e => {
                                    if (e.target.checked) setBlogTag(e.target.id)
                                    else setBlogTag(null)
                                }}></input>
                                <label class="form-check-label" for={tag.id}>{tag.name}</label>
                            </div>
                        ))
                    }
                </div>
                <Row style={{ width: '90%' }}>
                    {
                        (isLoading) ?
                            <Loading />
                            :
                            blogsList.map(blog => (
                                <Col className='mb-4' lg={4} md={6} sm={12} data-aos="fade-up" data-aos-delay="500" data-aos-duration="600" data-aos-easing="linear">
                                    <div className="p-3 rounded article-card h-100">
                                        <div>
                                            <img src={ApiConfig.BASE_URL_TAMKEEN + blog.field_image} alt="No image from Api" className='img-fluid rounded h-100 w-100' />
                                        </div>
                                        <div className='h-50'>
                                            <span style={{ backgroundColor: `${"#DBCCFC" ? "#FFF9E5" : "#DBCCFC"}` }}>{blog.field_tags[0] ?? 'Science'}</span>
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
                                                    <a href={`/articles/edit/${blog.id}`} target="_blank" title='Edit Article'><LiaEdit style={{ color: '#444647ff' }} /></a>
                                                    <button className="border-0 p-0" title="Delete article" onClick={() => deleteBlog(blog.id)} style={{ backgroundColor: 'transparent' }}>
                                                        <MdDeleteOutline />
                                                        <Toaster
                                                            position="top-right"
                                                            reverseOrder={false}
                                                        />
                                                    </button>
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