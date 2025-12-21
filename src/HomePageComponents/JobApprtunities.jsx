
import vector from '../assets/Vector.png'
import barChart from '../assets/bar-chart.png'
import clock from '../assets/Clock.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

// import required modules
import { Grid, Pagination } from 'swiper/modules';
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { HomePageServices } from '../Services/HomePageServices';
import Loading from '../Components/Loading';

const JobApprtunities = () => {

    const [jobApprtunities, setJobApprtunities] = useState([])
    const[isLoading, setLoading] = useState(false)

    function loadJobApprtunities() {
        setLoading(true)
        setJobApprtunities(HomePageServices.getJobApprtunities)
        setLoading(false)
    }

    useEffect(() => {
        loadJobApprtunities()
    }, [])

    return (
        (isLoading) ?
        <Loading />
        :
        <div className='job-apprtunities position-relative'>
            <span className="position-absolute job-apprtunities-tag" data-aos="fade-left" data-aos-delay="400" data-aos-duration="1000">
                Our Job Opprtunities
            </span>
            <Container>
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        jobApprtunities.map(item => (
                            <SwiperSlide>
                                <Row>
                                    {
                                        item.map(details => (
                                            <Col lg={6} className='mb-4 job-apprtunity-container' data-aos="zoom-in-up" data-aos-delay="500" data-aos-duration="1000" data-aos-easing="linear">
                                                <div className='d-flex job-apprtunity'>
                                                    <div>
                                                        <img src={details.jobCover} alt="" className='img-fluid h-100' />
                                                    </div>
                                                    <div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className='rounded'>{details.jobCat}</span>
                                                            <p>{details.salary} <span>/ Month</span></p>
                                                        </div>
                                                        <h2>{details.jobTitle}</h2>
                                                        <p>{details.yearOfExperience} Years of experience</p>
                                                        <hr className='m-0'/>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <img src={vector} alt="" />
                                                                <span>Part Time</span>
                                                            </div>
                                                            <div>
                                                                <img src={barChart} alt="" />
                                                                <span>Sinor</span>
                                                            </div>
                                                            <div>
                                                                <img src={clock} alt="" />
                                                                <span>Full Time</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Container>

        </div>
    )
}

export default JobApprtunities