import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import joinUs from '../assets/Join Us.png'
import joinGroup from '../assets/jobGroup.png'
import checkCircle from '../assets/checkCircle.png'
import { VacanciesServices } from '../Services/VacanciesServices'

const JobFeatures = () => {

    const [jobFeatures, setJobFeatures] = useState([])

    function loadJobFeatures() {
        setJobFeatures(VacanciesServices.getJobFeatures)
    }

    useEffect(() => {
        loadJobFeatures()
    }, [])

  return (
    <div className='join py-4'>
      <Container className='d-flex justify-content-between align-items-start position-relative'>
        <div className='w-50'>
            <h3 data-aos="fade-right" data-aos-delay="1000" data-aos-duration="500" data-aos-easing="linear">Why you will join our team</h3>
            <p data-aos="zoom-in" data-aos-delay="1200" data-aos-duration="500" data-aos-easing="linear">Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio. </p>
        </div>
        <div className='position-relative w-50'>
            <img src={joinGroup} alt="" className='img-fluid w-100 h-100'/>
            <img src={joinUs} alt='' className='position-absolute join-us-img' style={{  top: '40%', left: '40%', bottom: '40%'}} data-aos="fade-up" data-aos-delay="1000" data-aos-duration="500" data-aos-easing="linear"/>
        </div>
        <div className="d-flex align-items-center position-absolute job-features-container">
            {
                jobFeatures.map((item, index) => (
                    <div className="text-center job-feature border p-2" data-aos="fade-right" data-aos-delay={(index+1) * 500} data-aos-duration="500" data-aos-easing="linear">
                        <img src={checkCircle} alt="" />
                        <h6 className='mt-2 mb-2'>{item.title}</h6>
                        <p>{item.description}</p>
                    </div>
                ))
            }
        </div>
      </Container>
    </div>
  )
}

export default JobFeatures
