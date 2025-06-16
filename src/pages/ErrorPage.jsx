import React from 'react';
import Navbar from '../components/Navbar';
import Lottie from 'lottie-react';
import errorAnimation from '../assets/lottieFiles/error.json'

const ErrorPage = () => {
    return (
        <>
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-4">
            <Lottie animationData={errorAnimation} className="w-96" />
            
        </div>
        </> 
    );
};

export default ErrorPage;