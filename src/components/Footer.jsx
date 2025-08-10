import React from 'react';
import logoImg from '../assets/fresh-food.png';
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { AiOutlineYoutube } from 'react-icons/ai';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="footer justify-between sm:footer-horizontal bg-blue-900 text-neutral-content md:px-16 p-10">
        <aside>
            <NavLink to='/' className="flex items-center font-extrabold text-2xl text-white gap-x-2"><img src={logoImg} className="w-10 bg-white rounded-full" alt='logo' />ExpiryTracker</NavLink>
            <p>
            Your reliable food expiry tracker
            </p>
        </aside>
        <nav>
            <h6 className="footer-title font-bold">Socials</h6>
            <div className="grid grid-flow-col gap-4">
            <a href='https://www.facebook.com' target='_blank'>
                <CiFacebook  size={30}/>
            </a>
            <a href='https://www.youtube.com' target='_blank'>
                <AiOutlineYoutube size={30}/>
            </a>
            <a href='https://www.instagram.com' target='_blank'>
                <FaInstagram size={30}/>
            </a>
            </div>
        </nav>
        </footer>
        
    );
};

export default Footer;