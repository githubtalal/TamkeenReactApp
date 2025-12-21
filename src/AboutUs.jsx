import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Styles/AboutUsStyle.css'
import MarketDetails from './AboutUsComponents/MarketDetails'
import WebsiteLinks from './HomePageComponents/WebsiteLinks';
import AboutUsInfo from './AboutUsComponents/AboutUsInfo';
import TopTestimonials from './AboutUsComponents/TopTestimonials';


const AboutUs = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div style={{ marginTop: '100px' }}>
      <MarketDetails />
      <WebsiteLinks />
      <AboutUsInfo />
      <TopTestimonials />
    </div>
  )
}

export default AboutUs