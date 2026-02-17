import React, { useEffect, useState } from 'react'
import arrowLeft from '../assets/ArrowLeft.png'

import { Col, Container, Row } from 'react-bootstrap'
import { HomePageServices } from '../Services/HomePageServices'

import blueFrame from '../assets/blueFrame.png'
import greenFrame from '../assets/greenFrame.png'
import Loading from '../Components/Loading'

const Categories = () => {

    const [articleCategories, setArticleCategories] = useState([])
    const [isLoading, setLoading] = useState(false)

    // initial values for category brand and color
    let categoryBrand = blueFrame
    let categoryB_G_Color = '#F3EFFE'

    function loadArticleCategories() {
        setLoading(true)
        HomePageServices.getArticleCategories()
            .then(data => {
                setArticleCategories(data.map(item => {
                    let categoryDetail = {
                        description: 'Discover high-quality articles written by experts and creators.',
                        brand: categoryBrand,
                        backGround: categoryB_G_Color
                    }

                    // switch between values
                    categoryBrand = categoryBrand === blueFrame ? greenFrame : blueFrame
                    categoryB_G_Color = categoryB_G_Color === '#F3EFFE' ? '#FFFBEE' : '#F3EFFE'

                    return { ...item, ...categoryDetail }

                }))
                setLoading(false)

            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done'))
    }


    useEffect(() => {
        loadArticleCategories()
    }, [])

    return (
        (isLoading) ?
            <Loading /> 
            :
            <Container className='mt-4'>
                <div className="d-flex justify-content-between article-cat-head flex-wrap">
                    <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap">
                        <a href="#">
                            <img src={arrowLeft} alt="" />
                            <span className='browsing-tag'>Browse All</span>
                        </a>
                        <span className='cat-bio'>We have more category & subcategory.</span>
                    </div>
                    <div style={{ fontWeight: '600', fontSize: '30px' }} data-aos="fade-left" data-aos-delay="500" data-aos-duration="500">
                        Browse Our Articles <span className='position-relative'>Categories</span>
                    </div>
                </div>
                <Container>
                    <Row>
                        {
                            articleCategories.map(articleCat => (
                                <Col lg={3} md={6} sm={12} className='mb-4 p-4' data-aos="flip-left" data-aos-delay="400" data-aos-duration="500" data-aos-easing="linear">
                                    <div className='article-cat-details'>
                                        <div className="d-flex justify-content-center">
                                            <img src={articleCat.brand} alt="" style={{ marginBottom: '-100px' }} />
                                        </div>
                                        <div className="text-center rounded" style={{ backgroundColor: `${articleCat.backGround}`, paddingTop: '100px', paddingBottom: '70px', paddingInline: '40px' }}>
                                            <h3>{articleCat.name}</h3>
                                            <p style={{ color: '#4E5566', fontSize: '15px', fontWeight: '500' }}>{articleCat.description}</p>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </Container>
    )
}

export default Categories