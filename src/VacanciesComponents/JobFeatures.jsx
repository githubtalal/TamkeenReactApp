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
    <div className='join'>
      <Container className='d-flex justify-content-between align-items-center position-relative'>
        <div className='w-50' style={{ marginTop: '-100px'}}>
            <h3>Why you will join our team</h3>
            <p>Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio. </p>
        </div>
        <div className='position-relative w-50'>
            <img src={joinGroup} alt="" className='img-fluid w-100 h-100'/>
            <img src={joinUs} alt='' className='position-absolute' style={{ left: '245px', bottom: '210px'}}/>
        </div>
        <div className="d-flex align-items-center position-absolute job-features-container">
            {
                jobFeatures.map(item => (
                    <div className="text-center job-feature border p-2">
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
