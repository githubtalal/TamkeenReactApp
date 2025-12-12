import React from 'react'
import './Styles/AboutUsStyle.css'
import MarketDetails from './AboutUsComponents/MarketDetails'
import WebsiteLinks from './HomePageComponents/WebsiteLinks';
import AboutUsInfo from './AboutUsComponents/AboutUsInfo';
import TopTestimonials from './AboutUsComponents/TopTestimonials';


const AboutUs = () => {
  return (
    <div style={{ marginTop: '100px'}}>
      <MarketDetails />
      <WebsiteLinks />
      <AboutUsInfo />
      <TopTestimonials />
    </div>
  )
}

export default AboutUs