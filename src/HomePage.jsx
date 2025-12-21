import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Styles/HomePageStyle.css'
import Banner from './HomePageComponents/Banner';
import Categories from './HomePageComponents/Categories';
import LatestArticles from './HomePageComponents/LatestArticles';
import TopWriters from './HomePageComponents/TopWriters';
import JobApprtunities from './HomePageComponents/JobApprtunities';
import Partners from './HomePageComponents/Partners';
import WebsiteLinks from './HomePageComponents/WebsiteLinks';

const HomePage = () => {
  useEffect(() => {
        AOS.init();
      }, [])
  return (
    <div style={{ marginTop: '100px'}}>
      <Banner />
      <Categories />
      <LatestArticles />
      <TopWriters />
      <JobApprtunities />
      <Partners />
      <WebsiteLinks />
    </div>
  )
}

export default HomePage