import React from 'react'
import { Container } from 'react-bootstrap'

const PagePath = () => {
  return (
        <div className='faq-breadCrumb py-2'>
            <Container>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">FAQs</li>
                    </ol>
                </nav>
            </Container>
        </div>
  )
}

export default PagePath
