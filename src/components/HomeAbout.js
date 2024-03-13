import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import aboutImg from '../image/about-576x537.jpg'


export default function HomeAbout() {
    return (
        <>
            <Container className='About'>
                <Row>
                    <Col md={6} className='text-center pb-1'>
                        <img src={aboutImg} className='img-fluid' alt='' />
                    </Col>
                    <Col md={6} className='p-5' style={{ overflowX: 'hidden' }}>
                        <h4 className=' fs-4 ' data-aos="fade-left" data-aos-duration="3000" data-aos-delay="100">A Few Words About Our Store</h4>
                        <h1 className='fs-1 fw-bolder' data-aos="fade-left" data-aos-duration="3000" data-aos-delay="100">ABOUT US</h1>
                        <p className='text-body-tertiary' data-aos="fade-left" data-aos-duration="3000" data-aos-delay="100">Grocmart is a family-owned grocery store that has been offering quality products for you
                            r everyday life since 1999, while also providing superior service and competitive pric
                        </p>
                        <h5 data-aos="fade-left" data-aos-duration="3000" data-aos-delay="100">Decode </h5>
                        <h6 data-aos="fade-left" data-aos-duration="3000" data-aos-delay="100">CEO, Founder</h6>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
