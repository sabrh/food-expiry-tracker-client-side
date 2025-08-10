import React from 'react';
import Lottie from 'lottie-react';
import errorAnimation from '../assets/lottieFiles/error.json'
import { NavLink } from 'react-router';

const ErrorPage = () => {
    return (
        <>
        
        <div className="flex flex-col items-center justify-center mt-4">
            <Lottie animationData={errorAnimation} className="w-96" />
             
        </div>
        <div className='flex justify-center'>
            <NavLink to="/" className="btn mx-auto bg-gray-900 text-white hover:bg-white hover:text-gray-900 border-gray-800">
            BACK TO HOME</NavLink>
        </div>
        </> 
    );
};

export default ErrorPage;