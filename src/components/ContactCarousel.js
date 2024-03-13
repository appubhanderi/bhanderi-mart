import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Slider from 'react-slick'
import Img1 from '../image/Groscry.png'
import Img2 from '../image/vegetables.png'
import Img3 from '../image/Fruits.png'
import { Link } from 'react-router-dom'

export default function ContactCarousel() {

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true
    };

    return (
        <Container className='OurBlog pt-5 pb-4' style={{ overflowX: 'hidden' }}>
            <h4 className=' fs-4 text-center ' data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="100">Contact</h4>
            <h2 className=' fs-2 text-center pt-md-2' data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="100">CUSTOMER</h2>
            <Row className='pt-3'>
                <Col>
                    <div className="slider-container p-3">
                        <Slider {...settings} className='text-center'>
                            <div>
                                <img src={Img1} className='w-100 mb-1' alt="" />
                                <Link style={{ textDecoration: "none" }} className="btn btn-danger "
                                    to="/groscry">SHOP NOW</Link>{' '}
                            </div>
                            <div>
                                <img src={Img2} className='w-100 mb-1' alt="" />
                                <Link style={{ textDecoration: "none" }} className="btn btn-danger "
                                    to="/vegetable">SHOP NOW</Link>{' '}
                            </div>
                            <div>
                                <img src={Img3} className='w-100 mb-1' alt="" />
                                <Link style={{ textDecoration: "none" }} className="btn btn-danger "
                                    to="/fruit">SHOP NOW</Link>{' '}
                            </div>
                        </Slider>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
