import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import ContactWhatsapp from './ContactWhatsapp';
import product1 from "../VegetableImg/Vegetable1.jpg";
import product2 from "../VegetableImg/Vegetable2.png";
import product3 from "../VegetableImg/Vegetable3.jpg";
import product4 from "../VegetableImg/Vegetable4.png";
import product5 from "../VegetableImg/Vegetable5.png";
import product6 from "../VegetableImg/Vegetable6.jpg";
import product7 from "../VegetableImg/Vegetable7.png";
import product8 from "../VegetableImg/Vegetable8.jpg";
import product9 from "../VegetableImg/Vegetable9.png";
import product10 from "../VegetableImg/Vegetable10.jpg";
import product11 from "../VegetableImg/Vegetable11.jpg";
import product12 from "../VegetableImg/Vegetable12.jpg";
import product13 from "../VegetableImg/Vegetable13.jpg";
import firebaseApp from './SetupFirebase';



export default function ProductVegetable() {

    const [products, setProducts] = useState([]);
    const [loginId, setLoginId] = useState(null);

    const PRODUCTS = [
        {
            id: 1,
            productName: "Cauliflower ",
            price: 15.0,
            productImage: product1,
            qty: 1
        },
        {
            id: 2,
            productName: "Amla",
            price: 50.0,
            productImage: product2,
            qty: 1
        },
        {
            id: 3,
            productName: "Drumstick/Moringa",
            price: 193.0,
            productImage: product3,
        },
        {
            id: 4,
            productName: "Onion",
            price: 145.0,
            productImage: product4,
        },
        {
            id: 5,
            productName: "Peas",
            price: 40,
            productImage: product5,
        },
        {
            id: 6,
            productName: "Coriander ",
            price: 38.0,
            productImage: product6,
        },
        {
            id: 7,
            productName: "Carrot -Orange",
            price: 69.0,
            productImage: product7,
        },
        {
            id: 8,
            productName: " Carrot - Red ",
            price: 45.0,
            productImage: product8,
        },
        {
            id: 9,
            productName: "Potato",
            price: 12.0,
            productImage: product9,
        },
        {
            id: 10,
            productName: "Cucumber",
            price: 10.0,
            productImage: product10,
        },
        {
            id: 11,
            productName: "Bottle Gourd",
            price: 20.0,
            productImage: product11,
        },
        {
            id: 12,
            productName: "Cucumber -Grown",
            price: 43.0,
            productImage: product12,
        },
        {
            id: 13,
            productName: "Sweet Corn",
            price: 55.0,
            productImage: product13,
        }
    ];



    useEffect(() => {
        if (localStorage.getItem('loginId')) {
            setLoginId(JSON.parse(localStorage.getItem('loginId')));
        }
        getData();
    }, []);

    const getData = () => {
        const db = firebaseApp.firestore();
        db.collection("Mycart")
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map(doc => doc.data());
                setProducts(data);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    const addToCart = (product) => {
        handleSubmit(product);
    };

    const handleSubmit = (product) => {
        const db = firebaseApp.firestore();
        if (!localStorage.getItem('loginId')) {
            alert('Please login');
            return;
        }

        const newItem = {
            loginid: loginId,
            cartId: Date.now(),
            id: product.id,
            productImage: product.productImage || [],
            productName: product.productName || "",
            price: product.price || 0,
            qty: product.qty || 1,
            timestamp: Date.now(),
        };

        // Check if the item already exists in the cart
        db.collection("Mycart")
            .where("loginid", "==", loginId)
            .where("id", "==", product.id)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    alert('Item is already in the cart!');
                    console.log("Item is already in the cart!");
                    return;
                }

                // If the item is not already in the cart, add it
                db.collection("Mycart")
                    .add(newItem)
                    .then(() => {
                        alert('Item added to cart successfully!');
                        console.log("Item added to cart successfully!");
                    })
                    .catch((error) => {
                        console.error("Error adding item to cart: ", error);
                    });
            })
            .catch((error) => {
                console.error("Error checking item in cart: ", error);
            });
    };


    return (
        <Layout>
            <div className='pt-5 mt-3'></div>
            <ContactWhatsapp />
            <Container fluid className='pt-5 pb-3'>
                <Row className='gap-3 justify-content-center'>
                    <div className='text-center pt-3 pb-3 '>
                        <Link className='p-3 text-uppercase fs-4 success' style={{ textDecoration: "none" }}
                            to="/vegetable" active >Vegetable </Link>
                        <Link className='p-3 text-uppercase fs-4 success' style={{ textDecoration: "none" }}
                            to="/fruit" active >Fruit </Link>
                        <Link className='p-3 text-uppercase fs-4 success' style={{ textDecoration: "none" }}
                            to="/groscry" active >Groscry </Link>
                    </div>
                    {PRODUCTS.map((product) => (
                        <Col key={product.id} lg={2} md={3} sm={6} className='text-center '>
                            <div className='ProductVegetable m-auto'>
                                <section className="product pb-3">
                                    <img src={product.productImage} style={{ width: 100, height: 100 }} alt="" />
                                    <section className="description">
                                        <p>
                                            <b>{product.productName}</b>
                                        </p>
                                        <p>₹{product.price}</p>

                                    </section>
                                    <button className="btn btn-outline-secondary" onClick={() => addToCart(
                                        product)}>Add To Cart</button>
                                </section>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Layout>
    );
}
