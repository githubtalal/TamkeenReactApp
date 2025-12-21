import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Styles/VacanciesStyle.css'
import PagePath from './VacanciesComponents/PagePath'
import Banner from './VacanciesComponents/Banner'
import JobFeatures from './VacanciesComponents/JobFeatures'
import JobBenefits from './VacanciesComponents/JobBenefits'
import JobApprtunities from './HomePageComponents/JobApprtunities'

const Vacancies = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <>
            <PagePath />
            <Banner />
            <JobFeatures />
            <JobBenefits />
            <JobApprtunities />
        </>

    )
}

export default Vacancies
