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
        <div className="card bg-base-100 max-w-3xl mx-auto shrink-0 mt-1">
            <div className='flex md:flex-row'>
                <div className='mt-14 w-1/3'>
                    <Lottie style={{width:'200px'}} animationData={RegisterAnimation} loop={true}></Lottie>
                </div>
                <div className="card-body w-2/3">
                    <h1 className="text-3xl font-bold text-blue-700">Register Now!</h1>
                    <form onSubmit={handleSignup} className='flex flex-col'>
                        <label className="label">Name</label>
                        <input type="text" name="name" className="input" placeholder="Name" />

                        <label className="label">Email</label>
                        <input type="email" name="email" className="input" placeholder="Email" />

                        <label className="label">Photo URL</label>
                        <input type="text" name="photoURL" className="input" placeholder="Photo URL" />

                        <label className="label">Password</label>
                        <input type="password" name="password" className="input" placeholder="Password" />
                        
                        <button className="btn rounded-full bg-blue-700 text-white mt-4 md:w-3/5">Register</button>
                        {
                            errorMessage && <p className='text-red-600'>{errorMessage}</p>
                        }
                        {
                            success && <p className='text-green-600'>Account Created Successfully! Now you can Login.</p>
                        }
                        <p className='text-lg'>Already have an account? <NavLink to='/login' className='text-blue-600 font-bold hover:underline'>Login</NavLink>.</p>
                    </form>
                    
                    <p className='text-start text-gray-500 text-lg'>-- OR --</p>
                    <button onClick={handleGoogleSignin} className="btn rounded-full border-green-700 md:w-3/5"><FcGoogle size={20} />Signin with Google</button>
                </div>
            </div>
        </div>   
    );
};

export default Register;