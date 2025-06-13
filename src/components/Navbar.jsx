import React from 'react';
import { NavLink } from 'react-router';
import logoImg from '../assets/logo.png';
const Navbar = () => {
    const links = 
        <>
            <li><NavLink to='/' className={({ isActive }) => isActive ? 
            'underline text-gray-800 underline-offset-4 font-semibold' : ''}>Home</NavLink></li>
    
            <li><NavLink to='/fridge' className={({ isActive }) => isActive ? 
            'underline  text-gray-800 underline-offset-4 font-semibold' : ''}>Fridge</NavLink></li>

            <li><NavLink to='/add-food' className={({ isActive }) => isActive ? 
            'underline  text-gray-800 underline-offset-4 font-semibold' : ''}>Add Food</NavLink></li>

            <li><NavLink to='/my-items' className={({ isActive }) => isActive ? 
            'underline  text-gray-800 underline-offset-4 font-semibold' : ''}>My Items</NavLink></li>

        </>
    return (
        <div className="navbar bg-base-200 shadow-sm md:px-10">

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
                <NavLink to='/' className="flex items-center text-xl gap-x-1">ExpiryTracker<img src={logoImg} className="w-8" alt='logo' /></NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {links}
                </ul>
            </div>
            
           <div className="navbar-end relative md:justify-between items-center gap-x-4">
            <p className='text-gray-800 font-bold'><NavLink to='/login' className={({ isActive }) => isActive ? 
            'underline  text-gray-800 underline-offset-4 font-semibold' : ''}>Login</NavLink></p>

            <NavLink to="/register" state={{ from: location.pathname }} className="btn rounded-full bg-gray-900 text-white hover:bg-white hover:text-gray-900 border-gray-800">
            Register</NavLink>    
            </div>
        </div>
    );
};

export default Navbar;

/*
{!user ? (
                <NavLink to="/login" state={{ from: location.pathname }} className="btn rounded-full bg-green-700 text-white hover:bg-white hover:text-green-700">
                Login/Signup</NavLink>
                ) : (
                <div className="relative cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}
                    onMouseLeave={() => setDropdownOpen(false)}>
                    <img className="w-12 h-12 rounded-full border" src={user?.photoURL}
                    alt="User" title={user?.displayName} />
                    {dropdownOpen && (
                    <div className="absolute top-12 right-0 bg-white border rounded shadow p-2">
                        <p className="font-semibold mb-2">{user.displayName}</p>
                        <button onClick={handleLogout} className="btn btn-sm bg-red-600 text-white w-full">Logout
                        </button>
                    </div>
                    )}
                </div>
                */