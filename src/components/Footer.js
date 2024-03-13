import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ErrorMessage, Field, Formik } from 'formik';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <Container fluid className="p-3  Footer">
                <Row className=''>
                    <Col md={6} className="d-md-flex">
                        <div className='col-md-6'>
                            <h5>User Area</h5>
                            <ul className="nav flex-column">
                                <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/personalDetails" active>My Account</Link></li>
                                <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/addToCart" active>My Cart</Link></li>
                                <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/checkOut" active>Checkout</Link></li>
                            </ul>
                        </div>
                        <div className='col-md-6'>
                            <h5>Shopping Guide</h5>
                            <ul className="nav flex-column">
                                <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/" active>Payment</Link></li>
                                <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/" active>Shipment</Link></li>
                                <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/" active>FAQ</Link></li>
                                <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/" active>Return Policy</Link></li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={6} className="">
                        <h5>Subscribe to our newsletter</h5>
                        <p>Monthly digest of what's new and exciting from us.</p>
                        <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                        <Formik
                            initialValues={{ email: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Email is required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);
                            }}   >
                            {({ isSubmitting }) =>
                            (<Form> <Field className='form-control Footer_btn' type="email" name="email" placeholder="Enter your email" />
                                <ErrorMessage name="email" component="div" />
                                <Button className='Footer_btn mt-3' type="submit" disabled={isSubmitting}> Subscribe </Button>
                            </Form>)}
                        </Formik>
                        <ul className="list-unstyled d-flex pt-3 fs-4 gap-3">
                            <li><Link style={{ textDecoration: "none" }} to="/" active><FaTwitter /></Link></li>
                            <li><Link style={{ textDecoration: "none" }} to="/" active><AiFillInstagram /></Link></li>
                            <li><Link style={{ textDecoration: "none" }} to="/" active><FaFacebook /></Link></li>
                        </ul>
                    </Col>
                    <div className=" border-top text-center ">
                        <p className='pt-3'>© 2023 Company, Inc. All rights reserved.</p>
                    </div>
                </Row>
            </Container>
        </>
    )
}
