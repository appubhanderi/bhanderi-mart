import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material'; // Importing ThemeProvider from '@mui/material'
import createCache from '@emotion/cache';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import firebaseApp from './SetupFirebase';

export default function MyOrder() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
    }, []);


    const getData = () => {
        let newData = []
        const db = firebaseApp.firestore();
        db.collection("MyOder")
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


    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    });

    const options = {
        filterType: 'checkbox',
        responsive: 'vertical'
    };


    const columns = [
        {
            name: "img",
            label: "Image",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img style={{ width: 100 }} src={value} alt="Product" />
                )
            }
        },
        {
            name: "title",
            label: "Title",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "price",
            label: "Price",
            options: {
                filter: true,
                sort: false,
            }
        },

    ];

    return (
        <Layout>
            <div className='pt-5 mt-5'></div>
            <Container className=" pt-5 ">
                <h3 className='pb-2 text-center' style={{ borderBottom: '2px solid grey', }}>
                    <Link className=" text-body-secondary" style={{ textDecoration: "none" }}
                        to="" active>My Account</Link></h3>
                <Row className="">
                    <Col className="pb-3 text-center" >
                        <div className='pt-2 pb-2  ' style={{ borderBottom: '2px solid grey', }}>
                            <Link className="text-body-primary  me-5" style={{ textDecoration: "none", }} to="/personalDetails" active>Edit Profile</Link>
                            <Link className="text-body-primary  me-5" style={{ textDecoration: "none", }} to="/address" active>Delivery Addresses</Link>
                            <Link className="text-body-primary " style={{ textDecoration: "none", }} to="/myOrder" active>My Orders</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className='bg-white pt-3 pb-5' style={{ overflowX: 'hidden' }}>
                <Row className=''>
                    <Col className=''>
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <MUIDataTable
                                    title={"My order"}
                                    data={data}
                                    columns={columns}
                                    options={options}
                                />
                            </ThemeProvider>
                        </CacheProvider>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
