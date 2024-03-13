import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import firebaseApp from './SetupFirebase';

export default function CartControl(props) {

    const [loading, setLoading] = useState(false);
    const db = firebaseApp.firestore();

    const handlePlusQuantity = (itemId, qty) => {
        db.collection("Mycart")
            .where("id", '==', itemId,)
            .get()
            .then((querySnapshot) => {
                let docId = ''
                querySnapshot.forEach((doc) => {
                    docId = doc.id
                });
                // Increment quantity after fetching data
                setLoading(false);
                // Update quantity in the database
                var washingtonRef = db.collection("Mycart").doc(docId);
                return washingtonRef.update({
                    qty: qty + 1 // Increment by 1
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        props.getData()
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setLoading(false);
            });
    };


    const handleMinusQuantity = (itemId, qty) => {
        setLoading(true); // Start loading

        db.collection("Mycart")
            .where("id", "==", itemId)
            .get()
            .then((querySnapshot) => {
                let docId = '';
                querySnapshot.forEach((doc) => {
                    docId = doc.id;
                });

                if (docId && qty > 1) { // Check if document exists and quantity is greater than 1
                    const washingtonRef = db.collection("Mycart").doc(docId);
                    const updateQty = qty - 1;
                    return washingtonRef.update({
                        qty: updateQty
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
    };


    return (
        <>
            <tr key={props.index}>
                <td>
                    <div style={{
                        background: 'white', height: '8rem', overflow: 'hidden', display: 'flex',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <div style={{ padding: '.5rem' }}>
                            <img src={props.item.productImage} style={{ width: '4rem' }} alt={props.item.productName} />
                        </div>
                    </div>
                </td>
                <td>
                    <h6 style={{ whiteSpace: 'nowrap', width: '14rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {props.item.productName}
                    </h6>
                </td>
                <td>₹. {props.item.price}</td>
                <td>Quantity   {props.item.qty}</td>
                <td>
                    <Button onClick={() => handleMinusQuantity(props.item.id, props.item.qty)}>-</Button>
                    <Button onClick={() => handlePlusQuantity(props.item.id, props.item.qty)} className="ms-2">+</Button>
                    <Button variant="danger" className="ms-2">Remove Item</Button>
                </td>
            </tr >
        </>
    )
}