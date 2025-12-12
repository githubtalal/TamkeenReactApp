import React from 'react'
import './Styles/ContactUsStyle.css'
import Banner from './ContactUsComponents/Banner'
import Branches from './ContactUsComponents/Branches'
import ContactUsForm from './ContactUsComponents/ContactUsForm'

const ContactUs = () => {
  return (
    <div style={{ marginTop: '100px'}}>
        <Banner />
        <Branches />
        <ContactUsForm />
    </div>
  )
}

export default ContactUs