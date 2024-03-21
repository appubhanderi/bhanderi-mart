import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import firebaseApp from './SetupFirebase';
import { MdDeleteForever } from "react-icons/md";
import { red } from '@mui/material/colors';
import { BsCursor } from 'react-icons/bs';

export default function CartControl(props) {

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        console.log(props)
    }, [])

    const db = firebaseApp.firestore();

    const handlePlusQuantity = (itemId, qty, price) => {
        setLoading(true); // Start loading
        const loginId = localStorage.getItem('loginId');
        if (loginId) {
            db.collection("Mycart")
                .where("cartId", '==', itemId)
                .get()
                .then((querySnapshot) => {
                    let docId = '';
                    querySnapshot.forEach((doc) => {
                        docId = doc.id;
                    });

                    // Increment quantity after fetching data
                    setLoading(false);

                    // Calculate new total price
                    const newQty = qty + 1;
                    const totalPrice = newQty * price;

                    // Update quantity and price in the database
                    if (docId) {
                        var washingtonRef = db.collection("Mycart").doc(docId);
                        return washingtonRef.update({
                            qty: newQty, // Increment quantity by 1
                            totalItemPrice: totalPrice // Update total price
                        })
                            .then(() => {
                                console.log("Document successfully updated!");
                                props.getData();
                            })
                            .catch((error) => {
                                console.error("Error updating document: ", error);
                            });
                    } else {
                        console.log("Document not found.");
                    }
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    setLoading(false);
                });
        }
    };

    const handleMinusQuantity = (itemId, qty, price) => {
        setLoading(true); // Start loading
        const loginId = localStorage.getItem('loginId');
        if (loginId) {
            db.collection("Mycart")
                .where("cartId", "==", itemId)
                .get()
                .then((querySnapshot) => {
                    let docId = '';
                    querySnapshot.forEach((doc) => {
                        docId = doc.id;
                    });

                    if (docId && qty > 1) { // Check if document exists and quantity is greater than 1
                        const washingtonRef = db.collection("Mycart").doc(docId);
                        const updateQty = qty - 1;
                        const totalPrice = updateQty * price;
                        return washingtonRef.update({
                            qty: updateQty,
                            totalItemPrice: totalPrice // Update total price
                        })
                            .then(() => {
                                console.log("Document successfully updated!");
                                setLoading(false);
                                props.getData(); // Fetch updated data
                            })
                            .catch((error) => {
                                console.error("Error updating document: ", error);
                                setLoading(false);
                            });
                    } else {
                        console.log("Document not found or quantity is already at minimum.");
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                    setLoading(false);
                });
        }
    };

    const handleRemove = (itemId) => {
        setLoading(true); // Start loading
        const loginId = localStorage.getItem('loginId');
        if (loginId) {
            db.collection("Mycart")
                .where("cartId", "==", itemId)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // Delete the document
                        doc.ref.delete()
                            .then(() => {
                                console.log("Item removed from cart!");
                                setLoading(false);
                                props.getData(); // Fetch updated data
                            })
                            .catch((error) => {
                                console.error("Error removing item from cart: ", error);
                                setLoading(false);
                            });
                    });
                })
                .catch((error) => {
                    console.error("Error getting documents: ", error);
                    setLoading(false);
                });
        }
    };



    return (
        <>
            <tr key={props.index} style={{ overflowX: 'hidden' }}>
                <td>
                    <img src={props.item.productImage} alt={props.item.productName} style={{ width: 90 }} />
                </td>
                <td>
                    {props.item.productName}
                </td>
                <td>₹. {props.item.totalItemPrice}</td>
                <td>
                    <Button onClick={() => handleMinusQuantity(props.item.cartId, props.item.qty, props.item.price)}>-</Button>
                    <Button>{props.item.qty}</Button>
                    <Button onClick={() => handlePlusQuantity(props.item.cartId, props.item.qty, props.item.price)}>+</Button>
                </td>
                <td>
                    <MdDeleteForever onClick={() => handleRemove(props.item.cartId)} className='fs-1'
                        style={{ color: "red", cursor: 'pointer' }} />
                </td>
            </tr >
        </>
    )
}