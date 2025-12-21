import React, { useContext, useEffect, useRef, useState } from 'react'
import '../Styles/ArticleStyle.css'
import { ArticlesServices } from '../Services/ArticlesServices'
import { Container, Row, Col } from 'react-bootstrap'
import { ApiConfig } from '../API/ApiConfig'
import blueFeather from '../assets/blueFeather.png'
import Pagination from '@mui/material/Pagination';
import { LuEye } from "react-icons/lu";
import { LiaEdit } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import Loading from '../Components/Loading';
import toast, { Toaster } from 'react-hot-toast';



const ArticlesList = ({ currentPage }) => {
    const notify = () => toast.success('Article Deleted successfully', {
        duration: 2000
    });

    const [articlesList, setArticlesList] = useState([])
    const [copyArticlesList, setCopyArticlesList] = useState([])

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

    const [pageCount, setPageCount] = useState()

    const [isLoading, setLoading] = useState(true)

    let [currentPageNum, setCurrentPageNum] = useState(0)

    const loadArticles = () => {
        setLoading(true)
        ArticlesServices.getUserArticles({
            'page_number': currentPageNum,
            'credentials': userInfo.ps
        })
            .then(data => {
                console.log(data)
                setPageCount(data.pager.total_pages)
                setArticlesList(data.rows)
                setCopyArticlesList(data.rows)
                setLoading(false)
            })
            .catch(error => console.log(error))
            .finally(() => {
                console.log('Done Loading Articles')
            })
    }

    useEffect(() => {
        loadArticles()
    }, [])

    useEffect(() => {
        loadArticles()
    }, [currentPageNum])


    const deleteArticle = (aid) => {
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

    const filterArticles = (searchVal) => {
        let filterdArticles = [...copyArticlesList]
        setArticlesList([
            ...filterdArticles.filter(article => {
                return article.title.toLowerCase().includes(searchVal.toLowerCase()) ||
                    article.body.toLowerCase().includes(searchVal.toLowerCase()) ||
                    article.author.toLowerCase().includes(searchVal.toLowerCase())
            })
        ])
    }

    return (
        <Container style={{ padding: `${currentPage.includes('dashboard') ? "50px 0" : "130px 0"}` }} className='articles-list'>
            <center className="mb-4 d-flex justify-content-between align-items-center">
                <input type="search" name="article-search" id="article-search" className="form-control border-0 w-25 p-2" placeholder="Search.." style={{ backgroundColor: "#d9e2e7", color: "#422727ff", fontSize: "20px" }} onInput={e => filterArticles(e.target.value)} />
            </center>
            <Row>
                {
                    (isLoading) ?
                        <Loading />
                        :
                        articlesList.map(article => (
                            <Col className='mb-4' lg={3} md={4} sm={2} data-aos="fade-up" data-aos-delay="500" data-aos-duration="600" data-aos-easing="linear">
                                <div className="p-3 rounded article-card h-100">
                                    <div>
                                        <img src={ApiConfig.BASE_URL_TAMKEEN + article.field_image} alt="No image from Api" className='img-fluid rounded h-100 w-100' />
                                    </div>
                                    <div className='h-50'>
                                        <span style={{ backgroundColor: `${"#DBCCFC" ? "#FFF9E5" : "#DBCCFC"}` }}>{article.field_tags[0] ?? 'Science'}</span>
                                        <h6>{article.title}</h6>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <div style={{ height: '40px', width: '40px' }}>
                                                    <img src={blueFeather} alt="" className='img-fluid h-100 w-100' />
                                                </div>
                                                <span>{article.author}</span>
                                            </div>
                                            <div className="d-flex align-items-center icons-container">
                                                <a href={`/articles/${article.id}`} target="_blank" title='Show Aricle'><LuEye /></a>
                                                <a href={`/articles/edit/${article.id}`} target="_blank" title='Edit Article'><LiaEdit style={{ color: '#444647ff' }} /></a>
                                                <button className="border-0 p-0" title="Delete article" onClick={() => deleteArticle(article.id)} style={{ backgroundColor: 'transparent' }}>
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

export default ArticlesList
