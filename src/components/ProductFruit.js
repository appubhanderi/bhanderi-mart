import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import ContactWhatsapp from './ContactWhatsapp';
import product1 from "../FruitImg/Fruit1.jpg";
import product2 from "../FruitImg/Fruit2.png";
import product3 from "../FruitImg/Fruit3.jpg";
import product4 from "../FruitImg/Fruit4.jpg";
import product5 from "../FruitImg/Fruit5.png";
import product6 from "../FruitImg/Fruit6.jpg";
import product7 from "../FruitImg/Fruit7.jpg";
import product8 from "../FruitImg/Fruit8.jpg";
import product9 from "../FruitImg/Fruit9.jpg";
import product10 from "../FruitImg/Fruit10.jpg";
import product11 from "../FruitImg/Fruit11.jpg";
import product12 from "../FruitImg/Fruit12.jpg";
import firebaseApp from './SetupFirebase';


export default function ProductFruit() {
    const [products, setProducts] = useState([]);
    const [loginId, setLoginId] = useState(null);

    const PRODUCTS = [
        {
            id: 27,
            productName: "Zespri Kiwi ",
            price: 299.0,
            productImage: product1,

        },
        {
            id: 28,
            productName: "Banana",
            price: 39.0,
            productImage: product2,
        },
        {
            id: 29,
            productName: "Mango",
            price: 149.0,
            productImage: product3,
        },

        {
            id: 30,
            productName: "Orange",
            price: 99.0,
            productImage: product4,
        },
        {
            id: 31,
            productName: "Pomegranate ",
            price: 209,
            productImage: product5,
        },
        {
            id: 32,
            productName: "Pomegranate",
            price: 179.0,
            productImage: product6,
        },
        {
            id: 33,
            productName: "Guava ",
            price: 69.0,
            productImage: product7,
        },
        {
            id: 34,
            productName: "Tender Coconut, 1pc",
            price: 59.0,
            productImage: product8,
        },
        {
            id: 35,
            productName: " Apple - Shimla-1kg",
            price: 149.0,
            productImage: product9,
        },
        {
            id: 36,
            productName: "Strawberry",
            price: 79.0,
            productImage: product10,
        },
        {
            id: 37,
            productName: "Dragon Fruit white",
            price: 75.0,
            productImage: product11,
        },
        {
            id: 37,
            productName: "Grapes - Black",
            price: 75.0,
            productImage: product12,
        },
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
                                    <img src={product.productImage} style={{ width: 100, height: 100 }} alt='' />
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
    )
}



