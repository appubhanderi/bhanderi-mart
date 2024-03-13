import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './Layout'
import Login from './Login';
import Register from './Register';
import Home from './Home'
import HomeCarousel from './HomeCarousel'
import HomeAbout from './HomeAbout'
import HomeClients from './HomeClients'
import HomeOurBlog from './HomeOurBlog'
import Contact from './Contact'
import ContactUs from './ContactUs'
import Service from './Service'
import ProductVegetable from './ProductVegetable'
import ProductFruit from './ProductFruit'
import ProductGroscry from './ProductGroscry'
import ContactCarousel from './ContactCarousel'
import ContactWhatsapp from './ContactWhatsapp'
import ContactGoogleMap from './ContactGoogleMap'
import AddToCart from './AddToCart'
import CartControl from './CartControl';
import CheckOut from './CheckOut';
import PersonalDetails from './PersonalDetails';
import Address from './Address';
import MyOrder from './MyOrder';


export default function BhanderiMart() {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/layout' element={<Layout />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Home />} />
                <Route path='/homeCarousel' element={<HomeCarousel />} />
                <Route path='/homeAbout' element={<HomeAbout />} />
                <Route path='/homeClients' element={<HomeClients />} />
                <Route path='/homeOurBlog' element={<HomeOurBlog />} />
                <Route path='/service' element={<Service />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/contactWhatsapp' element={<ContactWhatsapp />} />
                <Route path='/contactCarousel' element={<ContactCarousel />} />
                <Route path='/contactUs' element={<ContactUs />} />
                <Route path='/contactGoogleMap' element={<ContactGoogleMap />} />
                <Route path='/vegetable' element={<ProductVegetable />} />
                <Route path='/fruit' element={<ProductFruit />} />
                <Route path='/groscry' element={<ProductGroscry />} />
                <Route path='/addToCart' element={<AddToCart />} />
                <Route path='/cartControl' element={<CartControl />} />
                <Route path='/checkOut' element={<CheckOut />} />
                <Route path='/personalDetails' element={<PersonalDetails />} />
                <Route path='/address' element={<Address />} />
                <Route path='/myOrder' element={<MyOrder />} />
            </Routes>
        </BrowserRouter >
    )
}
