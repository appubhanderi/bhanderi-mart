import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import img4 from "../image/Healthy Food.png";
import img5 from "../image//Home Made.png";
import img6 from "../image/Natural.png";
import img7 from "../image/Fast Delivery.png";
import "./Product.css";


export default function Service({ }) {
    return (
        <Container fluid className='mx-[320px] mt-[25px] pt-3 ProductService'>
            <hr className='pb-3 ' />
            <Row className='sub-section m-auto'>
                <Col className='sub-section-cont'>
                    <div className='main-section mb-2'>
                        <img src={img4} className="w-[93px] h-[93px]" alt="" />
                        <div>
                            <h2>Healthy Food</h2>
                            <p>It is a long established <br /> fact that </p>
                        </div>
                    </div>
                </Col>
                <Col className='sub-section-cont'>
                    <div className='main-section  mb-2'>
                        <img src={img5} className="w-[95px] h-[95px]" alt="" />
                        <div>
                            <h2>Home Made</h2>
                            <p>It is a long established <br /> fact that </p>
                        </div>
                    </div>
                </Col>
                <Col className='sub-section-cont'>
                    <div className='main-section  mb-2'>
                        <img src={img6} className="w-[76px] h-[81px]" alt="" />
                        <div>
                            <h2>100% Natural</h2>
                            <p>It is a long established <br /> fact that </p>
                        </div>
                    </div>
                </Col>
                <Col className='sub-section-cont'>
                    <div className='main-section  mb-2'>
                        <img src={img7} className="w-[119px] h-[64px]" alt="" />
                        <div>
                            <h2>Fast Delivery</h2>
                            <p>It is a long established <br /> fact that </p>
                        </div>
                    </div>
                </Col>
            </Row>
            <hr className='mt-[30px] ' />
        </Container>
    )
}
