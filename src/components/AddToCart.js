import React, { useEffect, useState } from 'react';
import { Button, Container, Col, Row, Table, Spinner } from 'react-bootstrap';
import { BsCartCheck } from 'react-icons/bs';
import Header from './Header';
import ContactWhatsapp from './ContactWhatsapp';
import firebaseApp from './SetupFirebase';
import CartControl from './CartControl';
import emptyimg from '../image/cart.empty.png';
import { useNavigate } from 'react-router-dom';

export default function AddToCart(props) {
    const [data, setData] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const Chackout = useNavigate()

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let total = 0
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
                        total = Number(total) + Number(doc.data().totalItemPrice)
                        setCartTotal(total)
                    });
                    setData(newData);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("Error getting documents: ", error);
                    setLoading(false);
                });
        }
    };
    const Checkout = () => {
        Chackout("/checkOut")


    }


    const emptyCart = () => {
        setLoading(true);
        const db = firebaseApp.firestore();
        const loginId = localStorage.getItem('loginId');
        if (loginId) {
            db.collection("Mycart")
                .where("loginid", '==', Number(loginId))
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        db.collection("Mycart").doc(doc.id).delete();
                    });
                    setData([]);
                    setCartTotal(0);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("Error emptying cart: ", error);
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <Header />
            <div className='pt-2 mt-5'></div>
            <ContactWhatsapp />
            <Container className="py-4 mt-5 pt-5">
                {loading ? (
                    <Spinner animation="border" role="status" className='m-auto'>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <>
                        <h1 className="my-5 text-center">
                            {data.length === 0 ? (
                                <img src={emptyimg} alt='No items' className='img-fluid' />
                            ) : (
                                'My Cart'
                            )}
                        </h1>
                        <Row className="justify-content-center">
                            <Table responsive="sm" striped bordered hover className="mb-5 table" style={{ overflowX: 'hidden' }}>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <CartControl key={item.id} item={item} getData={getData} />
                                    ))}
                                </tbody>
                            </Table>

                            <Row style={{ position: 'fixed', bottom: 0 }} className="justify-content-center w-100 bg-primary">
                                <Col className="py-2  text-center">
                                    <h4>Total Price: Rs. {cartTotal}</h4>
                                </Col>
                                <Col className="p-0 text-center" md={4}>
                                    <Button variant="danger" onClick={emptyCart} className="m-2">Empty Cart</Button>
                                    <Button variant="success" className="m-2" onClick={Checkout}>
                                        <BsCartCheck size="1.7rem" />
                                        Checkout
                                    </Button>
                                </Col>
                            </Row>

                        </Row>
                    </>
                )}
            </Container>
        </>
    );
}
