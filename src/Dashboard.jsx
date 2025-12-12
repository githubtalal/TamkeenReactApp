import React from 'react'
import SideBar from './DashboardComponents/SideBar'
import { Outlet } from 'react-router-dom'
import Header from './DashboardComponents/Header'
import Statistics from './DashboardComponents/Statistics'
import './Styles/DashboardStyle.css'

const Dashboard = ({ currentPage }) => {
    return (
        <div className='dashboard d-flex align-items-start'>
            <SideBar currentPage={currentPage}/>
            <div className="p-4">
                <Header />
                <Statistics currentPage={currentPage} />
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
