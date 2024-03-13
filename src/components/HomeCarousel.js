import React from 'react'
import { Carousel } from 'react-bootstrap'
import Product1 from '../image/slide-1.jpg'
import Product2 from '../image/slide-3.jpg'
import Product3 from '../image/slide-2.jpg'
import { Link } from 'react-router-dom'

export default function HomeCarousel() {
    return (
        <>
            <div className='pt-3'></div>
            <Carousel data-bs-theme="dark" style={{ overflowX: 'hidden' }}>
                <Carousel.Item>
                    <img className="d-block w-100  " src={Product1} alt="First slide" />
                    <Carousel.Caption>
                        <div className='CarouselHome'>
                            <h4 className='fs-4 text-white ' data-aos="fade-right" data-aos-duration="3000" data-aos-delay="300">Welcome to Our Online Store</h4>
                            <h1 className='display-2 fw-bold text-white' data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="300">GROCERY STORE</h1>
                            <h3 className='fs-3 text-white' data-aos="fade-right" data-aos-duration="3000" data-aos-delay="300">FOR TRUE GOURMETS</h3>
                            <Link style={{ textDecoration: "none" }} className="btn btn-danger "
                                to="/vegetable">SHOP NOW</Link>{' '}
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100  " src={Product2} alt=" Second slide" />
                    <Carousel.Caption>
                        <div className='CarouselHome'>
                            <h4 className='fs-4 text-white' data-aos="fade-right" data-aos-duration="3000" data-aos-delay="100">Fresh and Tasty</h4>
                            <h1 className='display-2 fw-bold text-white' data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="100">VEGETABLES</h1>
                            <h3 className='fs-3 text-white' data-aos="fade-right" data-aos-duration="3000" data-aos-delay="100">THAT YOU LOVE</h3>
                            <Link style={{ textDecoration: "none" }} className="btn btn-danger "
                                to="/vegetable">SHOP NOW</Link>{' '}
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100  " src={Product3} alt="Third slide" />
                    <Carousel.Caption >
                        <div className='CarouselHome'>
                            <h4 className='fs-4 text-white' data-aos="fade-right" data-aos-duration="3000" data-aos-delay="700">Fresh and Tasty</h4>
                            <h1 className='display-2 fw-bold text-white' data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="700">FRUITS</h1>
                            <h3 className='fs-3 text-white' data-aos="fade-right" data-aos-duration="3000" data-aos-delay="700">THAT YOU LOVE</h3>
                            <Link style={{ textDecoration: "none" }} className="btn btn-danger "
                                to="/fruit">SHOP NOW</Link>{' '}
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}
