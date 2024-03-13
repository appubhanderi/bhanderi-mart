import React from 'react'
import Layout from './Layout'
import CarouselHome from './HomeCarousel'
import About from './HomeAbout'
import Service from './Service'
import Clients from './HomeClients'
import OurBlog from './HomeOurBlog'
import ContactWhatsapp from './ContactWhatsapp'




export default function BmHome() {
    return (
        <Layout>

            <div className='pt-5 mt-5'></div>
            <ContactWhatsapp />
            <CarouselHome />
            <About />
            <Service />
            <Clients />
            < OurBlog />

        </Layout>
    )
}
