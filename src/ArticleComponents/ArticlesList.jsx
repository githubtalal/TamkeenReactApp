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
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const ArticlesList = ({ currentPage }) => {
    const notify = () => toast("Article Deleted Successfully", {
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

    const [articlesList, setArticlesList] = useState([])

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

    const [pageCount, setPageCount] = useState()

    const [isLoading, setLoading] = useState(true)

    let [currentPageNum, setCurrentPageNum] = useState(0)

    const navigate = useNavigate()

    const loadArticles = (page_number) => {
        setLoading(true)
        ArticlesServices.getUserArticles({
            'page_number': page_number,
            'credentials': userInfo.ps
        })
            .then(data => {
                console.log(data.rows[0].field_image.substring(data.rows[0].field_image.lastIndexOf('/') + 1))
                setPageCount(data.pager.total_pages)
                setArticlesList(data.rows)
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

    const deleteArticle = (aid) => {
        ArticlesServices.deleteArticle({
            "articleId": aid,
            "csrf_token": userInfo.csrf_token,
            "credentials": userInfo.ps
        })
            .then(data => {
                notify()
                setTimeout(() => {
                    loadArticles()
                }, 2000)
            })
            .catch(error => console.log(error))
            .finally(() => {
                console.log('Deleted Article Done')
            })
    }

    return (
        <Container style={{ padding: `${currentPage.includes('dashboard') ? "50px 0" : "130px 0"}` }} className='articles-list'>
            {
                (isLoading) ?
                    <Loading />
                    :
                    <>
                        <Row>
                            {
                                articlesList.map(article => (
                                    <Col className='mb-4' lg={3} md={4} sm={2}>
                                        <div className="p-3 rounded article-card h-100">
                                            <div>
                                                <img src={ApiConfig.BASE_URL_TAMKEEN + article.field_image} alt="No image from Api" className='img-fluid rounded h-100 w-100' />
                                            </div>
                                            <div>
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
                    </>
            }
            <Pagination count={pageCount} variant="outlined" color="primary" className="mt-4" style={{ justifyContent: 'center !important' }} onChange={e => {
                if (e.currentTarget.getAttribute('aria-label').includes('next')) {
                    loadArticles(currentPageNum + 1)
                    setCurrentPageNum(prev => prev + 1)
                }
                else if (e.currentTarget.getAttribute('aria-label').includes('previous')) {
                    loadArticles(currentPageNum - 1)
                    setCurrentPageNum(prev => prev - 1)
                }
                else {
                    loadArticles(parseInt(e.target.innerText) - 1)
                    setCurrentPageNum(parseInt(e.target.innerText) - 1)
                }
            }} />
        </Container>
    )
}

export default ArticlesList
