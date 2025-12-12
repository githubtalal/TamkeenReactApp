import React from 'react'
import { FaListUl } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
    return (
        <div className="header d-flex align-items-center justify-content-between">
            <h2>Dashboard User</h2>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FaListUl />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/">Home</Dropdown.Item>
                    <Dropdown.Item href="/vacancies">Vacancies</Dropdown.Item>
                    <Dropdown.Item href="/about-us">About Us</Dropdown.Item>
                    <Dropdown.Item href="/contact-us">Contact Us</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Header
