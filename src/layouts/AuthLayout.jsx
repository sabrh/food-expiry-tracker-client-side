import React from 'react';
import { NavLink, Outlet } from 'react-router';
import logoImg from '../assets/fresh-food.png';
import groceries from '../assets/groceries.png';

const AuthLayout = () => {
    return (
        <>
        <header>
            <div className="navbar navbar-start">
                <NavLink to='/' className="flex items-center font-extrabold text-2xl text-gray-700 gap-x-1 whitespace-nowrap">
                <img src={logoImg} className="w-10" alt='logo' /> ExpiryTracker
                </NavLink>
            </div>
        </header>
        <div>
            <div className="hero-content flex-row ">
                <div className='w-2/3'>
                    <Outlet></Outlet>
                </div>
                <div className='w-1/3'>
                    <img src={groceries} alt='groceries image' />
                </div>
            </div>
        </div>
        </>
    );
};

export default AuthLayout;