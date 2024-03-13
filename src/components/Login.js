import React, { useEffect } from 'react'
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import firebaseApp from './SetupFirebase';


export default function Login() {

    const Navigate = useNavigate();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [type, setType] = useState('login')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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

    const handleLogin = (credentials) => {
        const db = firebaseApp.firestore();
        let isLogin = false
        for (let i = 0; i < data.length; i++) {
            if (data[i].b_email === credentials.email && data[i].c_password === credentials.password) {
                isLogin = true
                localStorage.setItem('loginId', data[i].i_id)
            }
        }
        if (isLogin) {
            alert('Login successful!');
            Navigate('/');
        } else {
            alert('Invalid Email. Please Register.');
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            id: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email format').required('Required!'),
            password: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleLogin(values);
        },
    });

    const changeType = () => {
        setType('login')
    }

    return (
        <>
            <Button className='Header_btn ' variant="outline-success" onClick={handleShow}>
                Login
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {type == 'login' ? <form className="pt-3" onSubmit={formik.handleSubmit}>
                        <div>
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

                        <div>
                            <label>Password :</label>
                            <input
                                className="form-control"
                                placeholder="Enter your password"
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password && formik.touched.password && (
                                <p className="text-danger">{formik.errors.password}</p>
                            )}
                        </div>
                        <Modal.Footer className=''>
                            <Button className='' type="submit" variant="primary" onClick={handleClose}>
                                Submit
                            </Button>
                            <p>  If you don't have an account  <span style={{ color: 'blue', textDecoration: 'Underline', cursor: 'pointer' }}
                                onClick={() => setType('register')}>Register</span></p>
                        </Modal.Footer>
                    </form> :
                        <Register changeType={changeType} />}
                </Modal.Body>
                <div className='text-center pb-1'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Modal>
        </>

    )
}


