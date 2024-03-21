import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaAddressCard } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import firebaseApp from './SetupFirebase';

export default function ContactUs() {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            contact: '',
            message: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required!'),
            email: Yup.string().email('Invalid email format').required('Required!'),
            contact: Yup.string().required('Required!'),
            message: Yup.string().required('Required!')
        }),
        onSubmit: (values, { resetForm }) => {
            values.id = Date.now(); // Assigning a unique id
            const db = firebaseApp.firestore();
            db.collection('Contact').add(values)
                .then(() => {
                    alert('Data submitted successfully!');
                    resetForm();
                })
                .catch((error) => {
                    console.error('Error adding document: ', error);
                    alert('Error submitting data. Please try again later.');
                });
        },
    });
    return (
        <Container fluid className='bg-dark-subtle'>
            <Row>
                <Col md={6} className='ContactUs p-3'>
                    <h3>Bhanderi Mart Segments Reach Us</h3>
                    <h4>We Are Here To Help!</h4>
                    <form className="pt-3" onSubmit={formik.handleSubmit}>
                        <div className='pb-2'>
                            <label>Name :</label>
                            <input
                                className="form-control"
                                placeholder="Enter your name"
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.name && formik.touched.name && (
                                <p className="text-danger">{formik.errors.name}</p>
                            )}
                        </div>
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
                        <div className='pb-2'>
                            <label>Contact :</label>
                            <input
                                className="form-control"
                                placeholder="Enter your contact number"
                                type="text"
                                name="contact"
                                value={formik.values.contact}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.contact && formik.touched.contact && (
                                <p className="text-danger">{formik.errors.contact}</p>
                            )}
                        </div>
                        <div className='pb-2'>
                            <label>Message :</label>
                            <textarea
                                className="form-control"
                                placeholder="Enter your message"
                                name="message"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.message && formik.touched.message && (
                                <p className="text-danger">{formik.errors.message}</p>
                            )}
                        </div>
                        <button className='btn btn-primary' type="submit" variant="primary">
                            Subscribe
                        </button>
                    </form>
                </Col>
                <Col md={6}>
                    <div className="ContactUs p-3">
                        <h2>Contact Us</h2>
                        <p>The fastest way to get an answer is to use the chat support. Simply go to Bhanderi Mart's home page,
                            click the message icon (WhatsApp button) in the bottom right corner, and then
                            use live chat support to report your query or email at
                            <a href="mailto:info@bhanderimart.in" target="_blank">info@bhanderimart.in</a></p>
                        <p><strong>Media Enquiries:</strong> For quotes, interviews, or other media requests,
                            please contact 9374815450 or email at <a href="mailto:info@bhanderimart.in" target="_blank">
                                info@bhanderimart.in</a></p><hr />
                        <ul className='p-0' style={{ listStyle: 'none' }}>
                            <li><FaAddressCard className='me-2' /> Address: D-303, Start Residency, Amroli, Surat</li><hr />
                            <li><IoMdMail className='me-3' />info@bhanderimart.in</li><hr />
                            <li><FaPhoneAlt className='me-2' /> 9374815450, 02613146851</li><hr />
                        </ul>
                        <div className="working-time">
                            <h5>Working Hours</h5>
                            <p><span>Monday – Saturday:</span> 10AM – 10PM</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
