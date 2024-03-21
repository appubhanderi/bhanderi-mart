import React from 'react';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { Col, Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import firebaseApp from './SetupFirebase';

export default function Footer() {

    const formik = useFormik({
        initialValues: {
            email: '',

        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email format').required('Required!'),
        }),
        onSubmit: (values) => {
            values.id = Date.now()
            const db = firebaseApp.firestore();
            db.collection('Subscribers').add(values)
                .then(() => {
                    alert('Data submitted successfully!');
                    formik.resetForm()
                })
                .catch((error) => {
                    console.error('Error adding document: ', error);
                    alert('Error submitting data. Please try again later.');
                })

        },
    });

    return (
        <Container fluid className="p-3  Footer">
            <Row>
                <Col md={6} className="d-md-flex">
                    {/* User Area */}
                    <div className='col-md-6'>
                        <h5>User Area</h5>
                        <ul className="nav flex-column">
                            <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/personalDetails">My Account</Link></li>
                            <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/addToCart">My Cart</Link></li>
                            <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/checkOut">Checkout</Link></li>
                        </ul>
                    </div>
                    {/* Shopping Guide */}
                    <div className='col-md-6'>
                        <h5>Shopping Guide</h5>
                        <ul className="nav flex-column">
                            <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/">Payment</Link></li>
                            <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/">Shipment</Link></li>
                            <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/">FAQ</Link></li>
                            <li className='mb-2'><Link className="p-0 text-body-secondary" style={{ textDecoration: "none" }} to="/">Return Policy</Link></li>
                        </ul>
                    </div>
                </Col>
                {/* Subscription form */}
                <Col md={6}>
                    <h5>Subscribe to our newsletter</h5>
                    <p>Monthly digest of what's new and exciting from us.</p>
                    <form className="pt-3" onSubmit={formik.handleSubmit}>
                        <div className='pb-2'>
                            <label>Email :</label>
                            <input
                                className="form-control"
                                placeholder="Enter your email"
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <p className="text-danger">{formik.errors.email}</p>
                            )}
                        </div>
                        <button className='btn btn-primary' type="submit" variant="primary">
                            Subscribe
                        </button>
                    </form>
                    {/* Social media links */}
                    <ul className="list-unstyled d-flex pt-3 fs-4 gap-3">
                        <li><Link style={{ textDecoration: "none" }} to="https://twitter.com/home"><FaTwitter /></Link></li>
                        <li><Link style={{ textDecoration: "none" }} to="https://www.instagram.com/appu.bhanderi/?hl=en"><AiFillInstagram /></Link></li>
                        <li><Link style={{ textDecoration: "none" }} to="https://www.facebook.com/"><FaFacebook /></Link></li>
                    </ul>
                </Col>
            </Row>
            {/* Footer copyright */}
            <div className="border-top text-center pt-3">
                <p>© 2023 Company, Inc. All rights reserved.</p>
            </div>
        </Container>
    );
}
