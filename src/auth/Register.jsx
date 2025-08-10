import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { auth } from '../firebase/firebase.init';
import Lottie from 'lottie-react';
import RegisterAnimation from '../assets/lottieFiles/register.json';

const Register = () => {
    const [success, setSuccess]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const navigate = useNavigate()
    const location= useLocation()
    const from = location.state?.from || '/'
    
    const provider = new GoogleAuthProvider()

    const handleGoogleSignin = () =>{
    
    signInWithPopup(auth, provider)
    .then(result =>{
        console.log(result)
        navigate(from, {replace: true})
    })
    .catch(error =>{
        console.log(error)
    })
    }

    const handleSignup = e =>{
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const photoURL = e.target.photoURL.value
        console.log(name, email, password, photoURL)

        setSuccess(false)
        setErrorMessage('')

        // password validation 
        const passwordRegEx= /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        if(passwordRegEx.test(password) === false){
            setErrorMessage('Password should be at least 6 characters long and include atleast 1 uppercase and 1 lowercase character')
            return
        }

        // create user firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user=result.user
            setSuccess(true)

            updateProfile(user, {
                displayName: name,
                photoURL: photoURL
                })
                .then(() => {
                console.log('User profile updated');
                setSuccess(true);
                navigate(from, { replace: true });
                }).catch(error => {
                console.error('Error updating profile:', error);
                });
            })
        .catch(error => {
            console.log(error);
            setErrorMessage(error.message);
        })
        
    }

    return (
        <div className="flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
            <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">Register Now!</h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <label className="label font-semibold">Name</label>
        <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            placeholder="Name"
        />

        <label className="label font-semibold">Email</label>
        <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="Email"
        />

        <label className="label font-semibold">Photo URL</label>
        <input
            type="text"
            name="photoURL"
            className="input input-bordered w-full"
            placeholder="Photo URL"
        />

        <label className="label font-semibold">Password</label>
        <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            placeholder="Password"
        />

        <button className="btn rounded-full bg-blue-700 text-white w-full">Register</button>

        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        {success && (
            <p className="text-green-600 text-center">
            Account Created Successfully! Now you can Login.
            </p>
        )}

        <p className="text-center text-lg">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-600 font-bold hover:underline">
            Login
            </NavLink>.
        </p>
        </form>

        <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <p className="mx-4 text-gray-500">OR</p>
        <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
        onClick={handleGoogleSignin}
        className="btn rounded-full border-green-700 w-full flex items-center gap-2 justify-center"
        >
        <FcGoogle size={20} /> Sign in with Google
        </button>
        </div>
    </div>

    );
};

export default Register;