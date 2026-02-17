import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { HomePageServices } from '../Services/HomePageServices'
import blueFeather from '../assets/blueFeather.png'
import { ApiConfig } from '../API/ApiConfig'
import Loading from '../Components/Loading'

const LatestArticles = () => {

    const [latestArticles, setLatestArticles] = useState([])
    const categoryB_G = useRef('#DBCCFC')
    const [isLoading, setLoading] = useState(false)

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

    const loadLatestArticles = () => {
        setLoading(true)
        HomePageServices.getLatestArticles({
            userId: userInfo.userId,
            credentials: userInfo.ps
        })
            .then((data) => {
                setLatestArticles(data.rows)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => console.log('Done'))
    }

    useEffect(() => {
        if (userInfo) {
            loadLatestArticles()
        }

    }, [])

    return (

        <div className='latest-articles position-relative'>
            <span className='latestArticle-tag position-absolute border-0' data-aos="fade-right" data-aos-delay="1000" data-aos-duration="1000">Latest Articles</span>
            <Container className="latestArticles-container">
                {
                    (isLoading) ?
                        <Loading />
                        :
                        <Row>
                            {
                                latestArticles.map(latestArticle => (
                                    <Col className='mb-4' lg={3} md={6} sm={12} data-aos="fade-up" data-aos-delay="400" data-aos-duration="600" data-aos-easing="linear">
                                        <div className="p-3 rounded article-card h-100">
                                            <div>
                                                <img src={ApiConfig.BASE_URL_TAMKEEN + latestArticle.field_image} alt="No image from Api" className='img-fluid rounded h-100 w-100' />
                                            </div>
                                            <div>
                                                <span style={{ backgroundColor: `${categoryB_G.current === '#DBCCFC' ? '#FFF9E5' : '#DBCCFC'}` }}>{latestArticle.field_tags[0] ?? 'Science'}</span>

                                                <h6>{latestArticle.title}</h6>
                                                <div className='d-flex align-items-center'>
                                                    <div style={{ height: '40px', width: '40px' }}>
                                                        <img src={blueFeather} alt="" className='img-fluid h-100 w-100' />
                                                    </div>
                                                    <span>{latestArticle.author}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                }

            </Container>
        </div>
    )
}

export default LatestArticles