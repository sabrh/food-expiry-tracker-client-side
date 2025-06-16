import React from 'react';
import logoImg from '../assets/logo.png';
import { CiFacebook } from 'react-icons/ci';
import { AiOutlineYoutube } from 'react-icons/ai';

const Footer = () => {
    return (
        
        <footer className="footer footer-horizontal bg-neutral text-neutral-content items-center py-4 px-6 md:px-14">
            <aside className="grid-flow-col items-center">
                <img src={logoImg} className="w-8 bg-white rounded-full" alt='logo' />
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a href='https://facebook.com' target='_blank'><CiFacebook size={25} /></a>
                <a href='https://youtube.com' target='_blank'><AiOutlineYoutube size={25} /></a>
            </nav>
        </footer>
        
    );
};

export default Footer;