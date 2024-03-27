import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSignupMutation } from '@/api/api-slice';
import {setUserData,getUserData} from '@/utils/sessions';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [signup] = useSignupMutation();
  const handleSignUp = async () => {


    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    // Check if all fields are filled
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const response = await signup({ data: { email: email, password: password } });
    console.log(response)
    if (response.data.status === 201) {      
      const {email, role, id,name} = response.data.data;
      setUserData(email,role,id,name);
      if(role === 'Admin'){
        router.push('/admin')
      }else if(role === 'Teacher'){
        router.push('/teachers/dashboard')
      }
      else
      {
        router.push('/students/Dashboard')
      }
     
    }else{
      setErrorMessage('Error signing up. Please try again.');
    }

    
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
      
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm your password"
          />
  {errorMessage && <p className="text-red-500 text-xs  mb-4">{errorMessage}</p>}
        </div>
       
        <div className="text-center">
          <button
            onClick={()=>handleSignUp()}
            className="bg-primary  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
        <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <span
                        className="text-primary hover:underline cursor-pointer"
                        onClick={() => router.push('/signin')}
                    >
                        Sign In
                    </span>
                </p>
      </div>
    </div>
  );
};

export default SignUp;
