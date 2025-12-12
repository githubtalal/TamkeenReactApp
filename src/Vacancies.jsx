import React from 'react'
import './Styles/VacanciesStyle.css'
import PagePath from './VacanciesComponents/PagePath'
import Banner from './VacanciesComponents/Banner'
import JobFeatures from './VacanciesComponents/JobFeatures'
import JobBenefits from './VacanciesComponents/JobBenefits'
import JobApprtunities from './HomePageComponents/JobApprtunities'

const Vacancies = () => {
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
