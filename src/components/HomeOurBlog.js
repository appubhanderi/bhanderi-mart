import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Slider from 'react-slick'
import Img1 from '../image/post-1-420x368.jpg'
import Img2 from '../image/post-2-420x368.jpg'
import Img3 from '../image/post-3-420x368.jpg'
import Img4 from '../image/post-4-420x368.jpg'
import Img5 from '../image/post-5-420x368.jpg'

export default function HomeOurBlog() {

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <Container className='OurBlog pt-5 pb-5' style={{ overflowX: 'hidden' }}>
            <h4 className=' fs-4 text-center ' data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="100">Latest News</h4>
            <h2 className=' fs-2 text-center pt-3' data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="100">OUR BLOG</h2>
            <Row className='pt-3'>
                <Col>
                    <div className="slider-container p-3">
                        <Slider {...settings} className='text-center'>
                            <div>
                                <img src={Img1} className='w-100 mb-1' alt="" />
                                <h5>8 Useful Tips for Smart <br />Grocery Shopping  </h5>
                                <p> 25-jan-2024</p>
                            </div>
                            <div>
                                <img src={Img2} className='w-100 mb-1' alt="" />
                                <h5>How to Save Money When <br />Shopping for Vegetables</h5>
                                <p> 25-jan-2024</p>

                            </div>
                            <div>
                                <img src={Img3} className='w-100 mb-1' alt="" />
                                <h5>Navigating The Grocery Store <br /> For Healthy Eating</h5>
                                <p>  25-jan-2024</p>
                            </div>
                            <div>
                                <img src={Img4} className='w-100 mb-1' alt="" />
                                <h5>5 Reasons to Choose Gro- <br />cmart for Your Shopping</h5>
                                <p> 25-jan-2024</p>
                            </div>
                            <div>
                                <img src={Img5} className='w-100 mb-1' alt="" />
                                <h5>Why People are Shopping for  <br />Groceries Online</h5>
                                <p>25-jan-2024</p>
                            </div>
                        </Slider>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}
