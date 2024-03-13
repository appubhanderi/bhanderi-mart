import React from 'react'
import { FaWhatsappSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function ContactWhatsapp() {

    const handleWhatsAppChat = () => {
        const phoneNumber = '1234567890';
        const whatsappLink = `https://wa.me/${9374815450}`;
        window.open(whatsappLink, '_blank');
    };

    return (
        <Link className='ContactWhatsapp' style={{ zIndex: 1000 }} onClick={handleWhatsAppChat}>
            <FaWhatsappSquare />
        </Link>
    )
}
