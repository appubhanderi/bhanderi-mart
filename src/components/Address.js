import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import firebaseApp from './SetupFirebase';


export default function Address() {

    const [show, setShow] = useState(false);

    const initialValues = {
        HouseNo: '',
        Apartment: '',
        Street: '',
        Landmark: '',
        Area: '',
        City: '',
        PinCode: '',
    };

    const validationSchema = Yup.object({
        HouseNo: Yup.string().required('Address is required'),
        Apartment: Yup.string().required('Address is required'),
        Street: Yup.string().required('Address is required'),
        Landmark: Yup.string().required('City is required'),
        Area: Yup.string().required('State is required'),
        City: Yup.string().required('Country is required'),
        PinCode: Yup.string().required('Zipcode is required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            handleUpdate(values)
        },
    });

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        const id = localStorage.getItem("loginId");
        const db = firebaseApp.firestore();
        db.collection("BhanderiMart").where("i_id", "==", Number(id))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    formik.setFieldValue('HouseNo', doc.data().d_address.HouseNo)
                    formik.setFieldValue('Apartment', doc.data().d_address.Apartment)
                    formik.setFieldValue('Street', doc.data().d_address.Street)
                    formik.setFieldValue('Landmark', doc.data().d_address.Landmark)
                    formik.setFieldValue('Area', doc.data().d_address.Area)
                    formik.setFieldValue('City', doc.data().d_address.City)
                    formik.setFieldValue('PinCode', doc.data().d_address.PinCode)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    // oldData show in modal----------------

    // Assuming 'data' and 'setData' are defined in the component's scope

    const handleShow = (user) => {
        setShow(true);

    };
    const handleClose = () => {
        setShow(false);
    };

    // ProfileData Update-------------

    const handleUpdate = async (values) => {

        const id = localStorage.getItem('loginId');
        const db = firebaseApp.firestore();
        db.collection("BhanderiMart").where('i_id', '==', Number(id))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc)
                    try {
                        db.collection('BhanderiMart').doc(doc.id).update({
                            d_address: values
                        });
                        console.log('Document updated successfully');
                        getData()
                    } catch (error) {
                        console.error('Error updating document: ', error);
                    }
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });



    };



    return (
        <Layout>
            <div className='pt-5 mt-5'></div>
            <Container className=" pt-5">
                <h3 className='pb-2 text-center' style={{ borderBottom: '2px solid grey', }}>
                    <Link className=" text-body-secondary" style={{ textDecoration: "none" }}
                        to="" active>My Account</Link></h3>
                <Row className="">
                    <Col className="pb-3 text-center" >
                        <div className='pt-2 pb-2  ' style={{ borderBottom: '2px solid grey', }}>
                            <Link className="text-body-primary  me-5" style={{ textDecoration: "none", }} to="/personalDetails" active>Edit Profile</Link>
                            <Link className="text-body-primary  me-5" style={{ textDecoration: "none", }} to="/address" active>Delivery Addresses</Link>
                            <Link className="text-body-primary " style={{ textDecoration: "none", }} to="/myOrder" active>My Orders</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className='bg-white pt-3 pb-5' >
                <Row>
                    <Col>
                        <Card className='Personal_Detail'>
                            <Card.Body>
                                <div className='d-flex justify-content-between'>
                                    <h2 className="display-6 fw-semibold">Residental Detail</h2>
                                    <Button className='fs-4' onClick={handleShow}><MdEdit /></Button>
                                </div>

                                <div className='row  pb-md-3 pt-5'>
                                    <h4 className='col-md-3 mb-4 fw-normal'>HouseNo:</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal'>{formik.values.HouseNo}</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal'>Apartment:</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal'>{formik.values.Apartment}</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal pb-md-3'>Street:</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal pb-md-3'>{formik.values.Street}</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal'>Landmark:</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal'>{formik.values.Landmark}</h4>
                                </div>
                                <div className='row pb-3'>
                                    <h4 className='col-md-3 mb-4 fw-normal'>Area:</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal' >{formik.values.Area}</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal'>City:</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal' >{formik.values.City}</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal'>PinCode:</h4>
                                    <h4 className='col-md-3 mb-4 fw-normal' >{formik.values.PinCode}</h4>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
            </Container >

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Resident Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        {/* ... (previous code) ... */}
                        <label>House no:</label>
                        <input
                            className='form-control'
                            type="text"
                            name="HouseNo"
                            onChange={formik.handleChange}
                            value={formik.values.HouseNo}
                            required
                        />
                        {formik.touched.HouseNo && formik.errors.HouseNo ? (
                            <div>{formik.errors.HouseNo}</div>
                        ) : null}
                        <label>Apartment name:</label>
                        <input
                            className='form-control'
                            type="text"
                            name="Apartment"
                            onChange={formik.handleChange}
                            value={formik.values.Apartment}
                            required
                        />
                        {formik.touched.Apartment && formik.errors.Apartment ? (
                            <div>{formik.errors.Apartment}</div>
                        ) : null}
                        <label>Street details to locate you:</label>
                        <input
                            className='form-control'
                            type="text"
                            name="Street"
                            onChange={formik.handleChange}
                            value={formik.values.Street}
                            required
                        />
                        {formik.touched.Street && formik.errors.Street ? (
                            <div>{formik.errors.Street}</div>
                        ) : null}
                        <label>Landmark for easy reach out:</label>
                        <input
                            className='form-control'
                            type="text"
                            name="Landmark"
                            onChange={formik.handleChange}
                            value={formik.values.Landmark}
                            required
                        />
                        {formik.touched.Landmark && formik.errors.Landmark ? (
                            <div>{formik.errors.Landmark}</div>
                        ) : null}
                        <label>Area Details:</label>
                        <input
                            className='form-control'
                            type="text"
                            name="Area"
                            onChange={formik.handleChange}
                            value={formik.values.Area}
                            required
                        />
                        {formik.touched.Area && formik.errors.Area ? (
                            <div>{formik.errors.Area}</div>
                        ) : null}
                        <label>City:</label>
                        <input
                            className='form-control'
                            type="text"
                            name="City"
                            onChange={formik.handleChange}
                            value={formik.values.City}
                            required
                        />
                        {formik.touched.City && formik.errors.City ? (
                            <div>{formik.errors.City}</div>
                        ) : null}

                        <label >Pin Code:</label>
                        <input
                            className='form-control'
                            type="text"
                            name="PinCode"
                            onChange={formik.handleChange}
                            value={formik.values.PinCode}
                            required
                        />
                        {formik.touched.PinCode && formik.errors.PinCode ? (
                            <div>{formik.errors.PinCode}</div>
                        ) : null}

                        <div className='text-center pt-3 '>
                            <Button variant="primary" type='submit'>  Save Changes </Button>
                            <Button className='ms-3' variant="danger" onClick={handleClose}>  Close   </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </Layout>
    )
}
