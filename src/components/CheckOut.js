import Layout from "./Layout";
import React, { useEffect, useState } from 'react';
import { Button, Container, Col, Row, Table, Spinner } from 'react-bootstrap';
import ContactWhatsapp from './ContactWhatsapp';
import firebaseApp from './SetupFirebase';
import { useNavigate } from "react-router-dom";

export default function Checkout() {

    const [data, setData] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [itemTotal, setItemTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const MyOrder = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let Pricetotal = 0;
        let Itemtotal = 0;
        setLoading(true);
        const db = firebaseApp.firestore();
        const loginId = localStorage.getItem('loginId');
        let newData = [];
        if (loginId) {
            db.collection("Mycart")
                .where("loginid", '==', Number(loginId))
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        newData.push({ id: doc.id, ...doc.data() }); // Include document id
                        Pricetotal += Number(doc.data().totalItemPrice);
                        Itemtotal += Number(doc.data().qty);
                    });
                    setCartTotal(Pricetotal);
                    setItemTotal(Itemtotal);
                    setData(newData);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("Error getting documents: ", error);
                    setLoading(false);
                });
        }
    };

    const emptyCart = () => {
        setLoading(true);
        const db = firebaseApp.firestore();
        const loginId = localStorage.getItem('loginId');
        if (loginId) {
            db.collection("Mycart")
                .where("loginid", "==", Number(loginId))
                .get()
                .then((querySnapshot) => {
                    const promises = [];
                    querySnapshot.forEach((doc) => {
                        const item = doc.data();
                        promises.push(
                            db.collection("MyOrder")
                                .add(item)
                                .then(() => {
                                    // Remove item from cart
                                    return db.collection("Mycart")
                                        .doc(doc.id)
                                        .delete();
                                })
                        );
                    });
                    return Promise.all(promises);
                })
                .then(() => {
                    setLoading(false);
                    alert('Order successful!');
                    console.log("Order successful!");
                    MyOrder('/myOrder');
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error: ", error);
                });
        }
    };


    return (
        <Layout>
            <div className='pt-2 mt-5'></div>
            <ContactWhatsapp />
            <Container className="py-4 mt-5 pt-5">
                {loading ? (
                    <Spinner animation="border" role="status" className='m-auto'>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <>
                        <Row className="justify-content-center">
                            <Table responsive striped bordered hover className="mb-5 table" style={{ overflowX: 'hidden' }}>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img src={item.productImage} style={{ width: 90 }} alt={item.productName} />
                                            </td>
                                            <td>
                                                {item.productName}
                                            </td>
                                            <td>₹ {item.totalItemPrice}</td>
                                            <td> {item.qty}</td>
                                        </tr>

                                    ))}
                                </tbody>
                            </Table>
                            <Col className="d-md-flex justify-content-end gap-5 pt-3">
                                <Button variant="danger" onClick={emptyCart} className="mb-3">Pay Now</Button>
                                <h4 className="mb-3">Total Price: Rs. {cartTotal}</h4>
                                <h4>Total Qty: {itemTotal}</h4>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </Layout>
    )
}
