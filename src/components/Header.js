import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../image/bhanderi.png'
import Login from './Login';
import firebaseApp from './SetupFirebase';

export default function Header() {
    const Logout = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        showName();
    }, []);

    const showName = () => {
        const id = localStorage.getItem("loginId");
        let userData = [];
        const db = firebaseApp.firestore();
        db.collection("BhanderiMart")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    userData.push(doc.data());
                });
                if (id && userData.length > 0) {
                    const user = userData.find((userData) => userData.i_id == id);
                    if (user) {
                        setIsLoggedIn(true);
                        setUserName(user.a_Name);
                    }
                } else {
                    setIsLoggedIn(false);
                    setUserName('');
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    const logout = () => {
        alert('Logout successfully!');
        localStorage.removeItem("loginId");
        Logout('/');
    };


    return (
        <>
            <Navbar expand="lg" className="Header fixed-top">
                <Container fluid>
                    <Link style={{ textDecoration: "none" }} to="/" active><img src={logo} width={100} alt='' /></Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="m-auto my-2 my-lg-0 gap-4 fs-6 text-uppercase">
                            <Link style={{ textDecoration: "none" }} to="/" active className='fs-6'><MdPhoneInTalk className='fs-3 me-2' />9374815450</Link>
                            <Link style={{ textDecoration: "none" }} to="/vegetable" active>Products</Link>
                            <Link style={{ textDecoration: "none" }} to="/contact" active>Contact</Link>
                            <Link style={{ textDecoration: "none" }} to="/addToCart" active ><FaShoppingCart className='fs-4' /></Link>
                        </Nav>
                        {!isLoggedIn && <Login />}
                        {isLoggedIn && (
                            <Dropdown className='pe-5'>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    {userName}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item><Link className='nav-link active' to='/personalDetails'>My account</Link></Dropdown.Item>
                                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
