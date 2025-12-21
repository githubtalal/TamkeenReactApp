import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Styles/ContactUsStyle.css'
import Banner from './ContactUsComponents/Banner'
import Branches from './ContactUsComponents/Branches'
import ContactUsForm from './ContactUsComponents/ContactUsForm'

const ContactUs = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div style={{ marginTop: '100px' }}>
      <Banner />
      <Branches />
      <ContactUsForm />
    </div>
  )
}

export default ContactUs