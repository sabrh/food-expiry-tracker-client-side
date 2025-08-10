import React from 'react';
import Lottie from 'lottie-react';
import eatingAnimation from '../assets/lottieFiles/eating.json';
const Quote = () => {
    return (
        <div className="flex w-full flex-col lg:flex-row">
        <div className="rounded-l-lg bg-[#caeaec]  grid h-32 grow place-items-center">
            <p className='text-gray-700 text-lg font-bold'><small>Your daily food expiry tracker</small><br/>
            Caring for you, the way you deserve - every step of the way.</p>
        </div>
        
        <div className="rounded-r-lg bg-[#caeaec] grid h-32 grow place-items-center">
            <Lottie animationData={eatingAnimation} className="w-50" />
        </div>
        </div>
    );
};

export default Quote;