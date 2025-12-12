import React from 'react'
import './Styles/FAQsStyle.css'
import PagePath from './FAQsComponents/PagePath'
import Faqs from './FAQsComponents/Faqs'

const FAQs = () => {
    return (
        <div style={{ marginTop: '100px'}}>
            <PagePath />
            <Faqs />
        </div>
    )
}

export default FAQs
