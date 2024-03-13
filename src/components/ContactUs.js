import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaAddressCard } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

export default function ContactUs() {
    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.phone) {
            errors.phone = 'Required';
        } else if (!/^\d{10}$/i.test(values.phone)) {
            errors.phone = 'Invalid phone number';
        }
        if (!values.message) {
            errors.message = 'Required';
        }
        return errors;
    };

    return (
        <Container fluid className='bg-dark-subtle'>
            <Row>
                <Col md={6} className='ContactUs p-3'>
                    <h3>Bhanderi Mart Segments Reach Us</h3>
                    <h4>We Are Here To Help!</h4>
                    <Formik
                        initialValues={{ name: '', email: '', phone: '', message: '' }}
                        validate={validate}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <Field className="form-control" type="text" name="name" />
                                    <ErrorMessage name="name" component="div" />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <Field className="form-control" type="email" name="email" />
                                    <ErrorMessage name="email" component="div" />
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <Field className="form-control" type="text" name="phone" />
                                    <ErrorMessage name="phone" component="div" />
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="message">Message</label>
                                    <Field className="form-control" as="textarea" name="message" />
                                    <ErrorMessage name="message" component="div" />
                                </div>
                                <button className='btn btn-primary' type="submit" disabled={isSubmitting}>
                                    Sent Massage
                                </button>
                            </Form>
                        )}
                    </Formik>
                </Col>
                <Col md={6}>
                    <div className="ContactUs p-3">
                        <h2>contact us</h2>
                        <p>The Fastest Way To Get An Answer Is To Use The Chat Support. Simply Go To BHANDERI MART'S Home Page,
                            Click The Message Icon (Whatsapp Button) In The Bottom Right At The Corner and Then
                            Use Live Chat Support To Report Your Query or Can Mail At
                            <a href="mailto:itsflipkartgrocery@gmail.com" target="_blank">It's Bhanderi Mart</a></p>
                        <p><strong>Media Enquiries:</strong> For Quotes, Interviews or Other Media Requests,
                            Please Contact-9374815450 or else E-Mail At <a href="mailto:itsflipkartgrocery@gmail.com" target="_blank">
                                It's Bhanderi Mart</a></p><hr />
                        <ul className='p-0' style={{ listStyle: 'none' }}>
                            <li><FaAddressCard className='me-2' /> Address : D-303,Start Residency,Amroli,Surat</li><hr />
                            <li><IoMdMail className='me-3' />info@bhanderimart.in</li><hr />
                            <li><FaPhoneAlt className='me-2' /> 9374815450,02613146851</li><hr />
                        </ul>
                        <div className="working-time">
                            <h5>Working hours</h5>
                            <p><span>Monday – Saturday:</span>10AM – 10PM</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
