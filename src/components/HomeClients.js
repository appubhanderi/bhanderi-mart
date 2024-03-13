import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImQuotesLeft } from "react-icons/im";
import Img1 from '../image/Appu photo.jpeg'
import Img2 from '../image/Ashish.jpg'
import Img3 from '../image/Viren.jpg'


export default function HomeClients() {

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 3000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false

    };

    return (
        <Container fluid className='Clients' style={{ overflowX: 'hidden' }}>
            <h4 className=' fs-4 text-center ' data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="100">Latest Testimonials</h4>
            <h2 className=' fs-2 text-center' data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="100">OUR CLIENTS</h2>
            <Row className='pt-3'>
                <Col sm={3}></Col>
                <Col sm={6} className='ClientsCarousel '>
                    <div className="container slider-container">
                        <ImQuotesLeft className='Quote mt-3 mb-3' />
                        <Slider {...settings}>
                            <div className='text-center'>
                                <p className='text-body-tertiary'>I got my large order of Raw Vegan foods in today via UPS and was very impressed with the packaging &amp;
                                    freshness as well as the quality of my meals.</p>
                                <div className='d-flex align-items-end justify-content-center gap-3'>
                                    <img src={Img1} alt="" />
                                    <div className='client'>
                                        <h6>Alpesh</h6>
                                        <p>Client</p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center'>
                                <p className='text-body-tertiary'>I have to say I'm really impressed with my recent order. I've bought similar products from other sites before,
                                    but I chose you this time because of your great selection and prices.</p>
                                <div className='d-flex align-items-end justify-content-center gap-3'>
                                    <img src={Img2} alt="" />
                                    <div className='client'>
                                        <h6>Ashish</h6>
                                        <p>Client</p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center'>
                                <p className='text-body-tertiary'>I just received my order and was truly amazed. It was packed so well and the items are wonderful.
                                    I am new to ordering food online but it was a great experience.</p>
                                <div className='d-flex align-items-end justify-content-center gap-3'>
                                    <img src={Img3} alt="" />
                                    <div className='client'>
                                        <h6>Viren</h6>
                                        <p>Client</p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </Col>
                <Col sm={3}></Col>
            </Row>
        </Container>
    )
}
