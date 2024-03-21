import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import ContactWhatsapp from './ContactWhatsapp';
import product1 from "../GroscryImg/wheat.jpg";
import product2 from "../GroscryImg/millet .jpg";
import product3 from "../GroscryImg/corn .jpg";
import product4 from "../GroscryImg/sorghum .jpg";
import product5 from "../GroscryImg/chickpeas .jpg";
import product6 from "../GroscryImg/toor.jpg";
import product7 from "../GroscryImg/blackurad  dal.jpg";
import product8 from "../GroscryImg/Rani-Moong.jpg";
import product9 from "../GroscryImg/rice.jpg";
import product10 from "../GroscryImg/madhur-sugar.jpg";
import product11 from "../GroscryImg/fortune-oil.jpg";
import product12 from "../GroscryImg/sunflower-oil.jpg";
import product13 from "../GroscryImg/saffola-active oil.jpg";
import firebaseApp from './SetupFirebase';



export default function ProductGroscry() {
    const [products, setProducts] = useState([]);
    const [loginId, setLoginId] = useState(null);


    const PRODUCTS = [
        {
            id: 14,
            productName: "wheat 25 kg ",
            price: 999.0,
            productImage: product1,
        },
        {
            id: 15,
            productName: "millet 25 kg",
            price: 699.0,
            productImage: product2,
        },
        {
            id: 16,
            productName: "corn 1 kg",
            price: 99.0,
            productImage: product3,
        },
        {
            id: 17,
            productName: "sorghum 20 kg",
            price: 899.0,
            productImage: product4,
        },
        {
            id: 18,
            productName: "chickpeas 1 kg",
            price: 299,
            productImage: product5,
        },
        {
            id: 19,
            productName: "toor 1 kg",
            price: 229.0,
            productImage: product6,
        },
        {
            id: 20,
            productName: "black urad  dal 1 kg",
            price: 69.0,
            productImage: product7,
        },
        {
            id: 21,
            productName: "Rani-Moong 1 kg",
            price: 299.0,
            productImage: product8,
        },
        {
            id: 22,
            productName: " rice 20 kg",
            price: 2599.0,
            productImage: product9,
        },
        {
            id: 23,
            productName: "madhur-sugar",
            price: 59.0,
            productImage: product10,
        },
        {
            id: 24,
            productName: "Bottle Gourd",
            price: 20.0,
            productImage: product11,
        },
        {
            id: 25,
            productName: "Cucumber -Grown",
            price: 43.0,
            productImage: product12,
        },
        {
            id: 26,
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
            id: product.id,
            cartId: Date.now(),
            productImage: product.productImage || [],
            productName: product.productName || "",
            price: product.price || 0,
            totalItemPrice: product.price || 0,
            qty: product.qty || 1,
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
        </Layout >
    )

}




