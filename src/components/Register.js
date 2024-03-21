import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import firebaseApp from './SetupFirebase';

export default function Register(props) {

    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const NaviGate = useNavigate()


    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        let newData = []
        const db = firebaseApp.firestore();
        db.collection("BhanderiMart")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    newData.push(doc.data())
                    setData(newData)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const isEmailExists = (b_email) => {
        return data.some((user) => user.b_email == b_email);
    };

    const handleSubmit = (obj) => {
        const db = firebaseApp.firestore();

        if (isEmailExists(obj.b_email)) {
            alert("Email already exists!");
            return;
        }
        else {
            obj.i_id = Date.now();

            db.collection("BhanderiMart").add(obj)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            formik.resetForm();
            alert("Register Sucsses");
            NaviGate('/')
        }
    }

    const formik = useFormik({
        initialValues: {
            a_Name: "",
            b_email: "",
            c_password: "",
            d_address: {},

        },
        validationSchema: Yup.object({

            a_Name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            b_email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            c_password: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!"),
        }),
        onSubmit: values => {
            handleSubmit(values)
        }
    });


    return (
        <Container fluid className='' show={show} onHide={handleClose}>
            <Row className='' >
                <h1 className="fs-1">Register</h1>
                <Col>
                    <form className="pt-3" onSubmit={formik.handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input className="form-control"
                                type="text" placeholder="Name"
                                name="a_Name"
                                value={formik.values.a_Name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.a_Name && formik.touched.a_Name && (
                                <p>{formik.errors.a_Name}</p>
                            )}
                        </div>
                        <div>
                            <label>Email</label>
                            <input className="form-control"
                                type="email"
                                name="b_email"
                                value={formik.values.b_email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.b_email && formik.touched.b_email && (
                                <p>{formik.errors.b_email}</p>
                            )}
                        </div>
                        <div>
                            <label>Password</label>
                            <input className="form-control"
                                type="password"
                                name="c_password"
                                value={formik.values.c_password}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.c_password && formik.touched.c_password && (
                                <p>{formik.errors.c_password}</p>
                            )}
                        </div>
                        <div className="text-center pt-2 ">
                            <Modal.Footer className='justify-content-center'>
                                <Button className='' type="submit" variant="primary" onClick={handleClose}>
                                    Submit
                                </Button>
                                <p>If you have an account  <span style={{ color: 'blue', textDecoration: 'Underline', cursor: 'pointer' }}
                                    onClick={() => props.changeType()}>Login</span></p>
                            </Modal.Footer>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container >
    )
}
