import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <header><Navbar /></header>
            <main className='bg-base-100 text-black dark:bg-gray-800 dark:text-white'>
                <div className='min-h-[calc(100vh-129px)] mx-8 md:mx-16'>
                <Outlet></Outlet>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;