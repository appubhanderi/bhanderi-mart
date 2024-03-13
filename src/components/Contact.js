import React from 'react'
import Layout from './Layout'
import ContactCarousel from './ContactCarousel'
import ContactUs from './ContactUs'
import ContactWhatsapp from './ContactWhatsapp'
import ContactGoogleMap from './ContactGoogleMap'


export default function Contact() {


    return (
        <Layout>
            <div className='pt-5 mt-5'></div>
            <ContactWhatsapp />
            <ContactCarousel />
            <ContactUs />
            < ContactGoogleMap />
        </Layout>
    )
}
