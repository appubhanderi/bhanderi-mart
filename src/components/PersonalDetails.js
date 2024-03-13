import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ProfilePic from '../image/images.png'
import Modal from 'react-bootstrap/Modal';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import Layout from './Layout';
import { Link } from 'react-router-dom';
import firebaseApp from './SetupFirebase';



export default function PersonalDetails() {


    const [show, setShow] = useState(false);
    const [, setData] = useState();
    const [userData, setUserData] = useState([]);
    const [imageSrc, setImageSrc] = useState(
        './Image/images.png'
    );

    const [img, setImg] = useState('');
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [contact, setContact] = useState('');



    const validationSchema = Yup.object({
        Name: Yup.string().required('First Name is required'),
        email: Yup.string().email("Invalid email format"),
        tel: Yup.string().required('Contact is required'),
    });

    // Create the formik object using the useFormik hook
    const formik = useFormik({
        initialValues: {
            Name: '',
            Email: '',
            tel: '',
        },
        validationSchema,
        onSubmit: (values) => {
            // Implement your submission logic here
            console.log(values);
            handleUpdate(values)
        },
    });


    // ProfileData show in Table------------


    useEffect(() => {
        // const id = Number(localStorage.getItem('loginId'));
        // const data = JSON.parse(localStorage.getItem('BhanderiMart')) || [];

        // if (id && data.length > 0) {
        //     const user = data.find((userData) => userData.i_id === id);
        //     if (user) {
        //         setImageSrc(user.Photo || ProfilePic);
        //         setName(user.a_Name);
        //         setEmail(user.b_email);
        //         setContact(user.contact);
        //     }
        // }
        getData()
    }, []);
    const getData = async () => {
        const db = firebaseApp.firestore();
        const loginId = localStorage.getItem('loginId');
        if (loginId) {
            try {
                const querySnapshot = db.collection("Mycart")
                    .get();
                console.log(userData)
                let userData = [];
                querySnapshot.forEach(doc => {
                    userData.push({ id: doc.id, ...doc.data() });
                });
                if (userData.length === 0) {
                    const data = JSON.parse(localStorage.getItem('Mycart')) || [];
                    const user = data.find(userData => userData.i_id === loginId);
                    if (user) {
                        setImageSrc(user.Photo || ProfilePic);
                        setName(user.a_Name);
                        setEmail(user.b_email);
                        setContact(user.contact);
                    }
                }
                setUserData(userData);
            } catch (error) {
                console.log("Error getting documents: ", error);
            }
        }
    };


    // oldData show in modal----------------


    // Assuming 'data' and 'setData' are defined in the component's scope


    const handleShow = (user) => {
        setShow(true);
        formik.setFieldValue('Name', Name)
        formik.setFieldValue('Email', Email)
        formik.setFieldValue('tel', contact)
    };
    const handleClose = () => {
        setShow(false);
    };


    // ProfileData Update-------------

    const handleUpdate = (obj) => {
        const id = Number(localStorage.getItem('loginId'));
        console.log(obj)
        let array = JSON.parse(localStorage.getItem('BhanderiMart'))
        let objIndex = array.findIndex((item) => item.i_id === id);
        console.log(array, objIndex)


        array[objIndex].Photo = img;
        array[objIndex].a_Name = obj.Name;
        array[objIndex].b_email = obj.Email;
        array[objIndex].contact = obj.tel;

        setImageSrc(img || ProfilePic);
        setData(array);
        setShow(false);
        localStorage.setItem('BhanderiMart', JSON.stringify(array));

    };


    // Profile pic show ----------


    const handleFileChange = (e) => {
        if (e.target.files.length) {
            const src = URL.createObjectURL(e.target.files[0]);
            setImageSrc(src);
        }
        const imageFile = e.target.files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.addEventListener('load', () => {
                // Get the data URL string
                setImg(reader.result)
            });
        }
    }


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
                <Row className='justify-content-center'>
                    <Col>
                        <Card className='Personal_Detail p-0'>
                            <Card.Body>
                                <div className='d-flex justify-content-between'>
                                    <h2 className="display-6 fw-semibold">Personal Detail</h2>
                                    <Button className='fs-4' onClick={handleShow}><MdEdit /></Button>
                                </div>
                                <div className='text-center ProfilePic pt-5 pb-5'>
                                    <img src={imageSrc} style={{ width: 120, height: 120 }} alt='' className='image-fluid' />
                                </div>
                                <div>
                                    <div>
                                        <div className='row  pb-md-3 '>
                                            <h4 className='col-md-2 mb-4 fs-4 fw-normal'>Name:</h4>
                                            <h4 className='col-md-4 mb-4 fs-4 fw-normal'>{Name}</h4>
                                            <h4 className='col-md-2 mb-4 fs-4 fw-normal'>Email:</h4>
                                            <h4 className='col-md-4 mb-4 fs-4 fw-normal'>{Email}</h4>
                                            <h4 className='col-md-2 mb-4 fs-4 fw-normal'>Mobile No:</h4>
                                            <h4 className='col-md-4 mb-4 fs-4 fw-normal'>{contact}</h4>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
            </Container >
            <Container fluid className='bg-white' >
                <Row className='justify-content-end'>
                    <Col >
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="ProfilePic text-center">
                                    <img src={imageSrc} style={{ width: 100, height: 100 }} alt='' className='image-fluid' />
                                </div>
                                <p>Change your Profile:</p>
                                <label htmlFor="img" className="btn btn-primary"><FaCloudUploadAlt />Upload File</label>
                                <input className='d-none' accept="image/*" type="file" id="img" onChange={handleFileChange} />
                                <div className="update_form">
                                    <form onSubmit={formik.handleSubmit}>
                                        <label> Name:</label>
                                        <input
                                            className='form-control'
                                            type="text"
                                            name="name"
                                            onChange={formik.handleChange}
                                            value={formik.values.Name}
                                            required />
                                        {formik.touched.Name && formik.errors.Name ? (
                                            <div>{formik.errors.Name}</div>
                                        ) : null}

                                        <label>Email:</label>
                                        <input
                                            className='form-control'
                                            type="text"
                                            name="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.Email}
                                            required />
                                        {formik.touched.Email && formik.errors.Email ? (
                                            <div>{formik.errors.Email}</div>
                                        ) : null}
                                        <label>Contact:</label>
                                        <input
                                            className='form-control'
                                            type="tel"
                                            name="tel"
                                            onChange={formik.handleChange}
                                            value={formik.values.tel}
                                            required />
                                        {formik.touched.tel && formik.errors.tel ? <div>{formik.errors.tel}</div> : null}
                                        <div className='text-center pt-3 '>
                                            <Button variant="primary" type='submit'>  Save Changes </Button>
                                            <Button className='ms-3' variant="danger" onClick={handleClose}>  Close   </Button>
                                        </div>
                                    </form>
                                </div>
                            </Modal.Body>
                        </Modal >
                    </Col>
                </Row >
            </Container >
        </Layout>
    )
}
