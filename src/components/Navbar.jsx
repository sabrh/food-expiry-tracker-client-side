import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router';
import logoImg from '../assets/fresh-food.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import AuthContext from '../context/AuthContext'
import { GiMeat } from "react-icons/gi";
import { FaCarrot } from "react-icons/fa";
import { PiCheeseFill } from "react-icons/pi";
import { GiChocolateBar } from "react-icons/gi";
import { TbBottleFilled } from "react-icons/tb";

const Navbar = () => {
     const location=useLocation()
        const {user}=useContext(AuthContext)
    
        const handleLogout= () => {
            signOut(auth)
            .then(() => {
                console.log('User logged out')
            })
            .catch(err => console.error(err))
    
        }
    const links = 
        <>
            <li className='uppercase'><NavLink to='/' className={({ isActive }) => isActive ? 
            'underline text-blue-400 underline-offset-4 font-bold' : ''}>Home</NavLink></li>
    
            <li className='uppercase'><NavLink to='/fridge' className={({ isActive }) => isActive ? 
            'underline  text-blue-400 underline-offset-4 font-bold' : ''}>Fridge</NavLink></li>

            <li className='uppercase'><NavLink to='/fruit-veg' className={({ isActive }) => isActive ? 
            'underline  text-blue-400 underline-offset-4 font-bold' : ''}><FaCarrot size={20} />Fruits/ Veg</NavLink></li>

            <li className='uppercase'><NavLink to='/meat-fish' className={({ isActive }) => isActive ? 
            'underline  text-blue-400 underline-offset-4 font-bold' : ''}><GiMeat size={20}/>Meats & Fish</NavLink></li>

            <li className='uppercase'><NavLink to='/dairy' className={({ isActive }) => isActive ? 
            'underline  text-blue-400 underline-offset-4 font-bold' : ''}><PiCheeseFill size={20} />Dairy</NavLink></li>

            <li className='uppercase'><NavLink to='/snacks' className={({ isActive }) => isActive ? 
            'underline  text-blue-400 underline-offset-4 font-bold' : ''}><GiChocolateBar size={20} />Snacks</NavLink></li>

            <li className='uppercase'><NavLink to='/drinks' className={({ isActive }) => isActive ? 
            'underline  text-blue-400 underline-offset-4 font-bold' : ''}><TbBottleFilled size={20} />Drinks</NavLink></li>


            {user && (
                <>
                    <li className='uppercase'>
                    <NavLink to="/add-food" className={({ isActive }) =>
                        isActive ? 'underline text-gray-800 underline-offset-4 font-semibold' : ''}>Add Food</NavLink>
                    </li>

                    <li className='uppercase'>
                    <NavLink to="/my-items" className={({ isActive }) =>
                        isActive ? 'underline text-gray-800 underline-offset-4 font-semibold' : ''}>My Items</NavLink>
                    </li>
                </>
            )}
        </>

    return (
        <div className="navbar shadow-sm md:px-16">

            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {links}
                </ul>
                </div>
                <NavLink to='/' className="flex items-center font-extrabold text-2xl text-gray-700 gap-x-2"><img src={logoImg} className="w-10" alt='logo' />ExpiryTracker</NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {links}
                </ul>
            </div>
            
           <div className="navbar-end relative items-center gap-x-4 md:ml-10">
            {!user ? (
                <div className='flex flex-row justify-end items-center gap-4'>
                    <p className='text-gray-800 font-bold'><NavLink to='/login' className={({ isActive }) => isActive ? 
                    'underline  text-gray-800 underline-offset-4 font-semibold' : ''}>LOGIN</NavLink></p>

                    <NavLink to="/register" state={{ from: location.pathname }} className="btn rounded-full bg-gray-900 text-white hover:bg-white hover:text-gray-900 border-gray-800">
                    REGISTER</NavLink>  
                </div>  
                ) : (
                <div className='flex flex-row items-center gap-4'>
                    <img className="w-12 h-12 rounded-full border" src={user?.photoURL} alt="User" title={user?.displayName} />
                    <button onClick={handleLogout} className="btn btn-error text-white rounded-full">LOGOUT</button>
                </div>
                )}
            
            </div>
        </div>
    );
};

export default Navbar;
