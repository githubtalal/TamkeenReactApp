import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { FAQsServices } from '../Services/FAQsServices';
import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const Faqs = () => {

    const [faqs, setFAQs] = useState([])

    function loadFAQs() {
        FAQsServices.getFAQs()
        .then(data => {
            setFAQs(data)
        })
    }

    useEffect(() => {
        loadFAQs()
    }, [])

    return (
        <Container className='d-flex align-items-start faqs py-4 justify-content-between'>
            <ListGroup defaultActiveKey="0">
                {
                    faqs.map(item => (
                        <ListGroup.Item action href="#link1">
                            {item.category}
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            <div>
                <h3 className='mb-3'>FAQs</h3>
                <Accordion defaultActiveKey="0">
                    {
                        faqs.map((item, index) => (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>{item.title}</Accordion.Header>
                                <Accordion.Body>Aliquam semper tellus vel lacus rutrum mollis. Nunc vitae iaculis lacus, id fringilla leo. Nulla dictum, enim nec bibendum auctor, lorem mi rutrum urna, sed luctus urna nibh sit amet velit. </Accordion.Body>
                            </Accordion.Item>
                        ))
                    }
                </Accordion>
            </div>

        </Container>
    )
}

export default Faqs
