import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { auth } from '../firebase/firebase.init';
import LoginAnimation from '../assets/lottieFiles/login.json';
import Lottie from 'lottie-react';

const Login = () => {
  const [success, setSuccess]=useState(false)
  const [errorMessage, setErrorMessage]=useState('')

  const emailRef=useRef()

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

  const handleLogin = e =>{
    e.preventDefault()

    const email=e.target.email.value
    const password=e.target.password.value

    setSuccess(false)
    setErrorMessage('')
    // login user firebase
    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setSuccess(true);
      navigate(from, { replace: true });
    })
    .catch(error =>{
      console.log(error)
      setErrorMessage(error.message)
    })
  }

  const handleForgetPassword = () =>{
    const email=emailRef.current.value

    setErrorMessage('')

    // send password reset mail
    sendPasswordResetEmail(auth, email)
    .then(() =>{
      alert('A password reset email has been sent. Please check your email.')
    })
    .catch(error =>{
      setErrorMessage(error.message)
    })
  }

    return (
      <div className="flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">Welcome Back!</h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              className="input input-bordered w-full"
              placeholder="Email"
            />

            <label className="label font-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Password"
            />

            <div onClick={handleForgetPassword} className="text-sm text-right">
              <a className="link link-hover text-blue-500">Forgot password?</a>
            </div>

            <button className="btn rounded-full bg-blue-700 text-white w-full">Login</button>

            {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
            {success && <p className="text-green-600 text-center">Logged In!</p>}

            <p className="text-center text-lg">
              Don't have an account?{" "}
              <NavLink to="/register" className="text-blue-600 font-bold hover:underline">
                Register
              </NavLink>{" "}
              here.
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

export default Login;