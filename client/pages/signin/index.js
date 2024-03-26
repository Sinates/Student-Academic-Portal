
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SideBarNav from '@/components/common/SideBarNavigation';
import RootLayout from '@/layouts/RootLayout';
import { useSigninMutation } from '@/api/api-slice';

const SignIn = () => {
    const [emailOrId, setEmailOrId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [teacherProfile, setTeacherProfile] = useState(null); // State to store teacher profile data
    const router = useRouter();
    const [signIn] = useSigninMutation();
    useEffect(() => {
        // Check if user is signed in and teacher profile exists in local storage
        const storedTeacherProfile = localStorage.getItem('teacherProfile');
        const isSignedIn = storedTeacherProfile && JSON.parse(storedTeacherProfile).signedIn;

        // if (isSignedIn) {

        //     setTeacherProfile(JSON.parse(storedTeacherProfile).profile);
        //      <SideBarNav roleUser={role} />
        //     router.push('components/common/SideBarNavigation'); // Navigate to /teachers/dashboard if signed in
        // }
    }, [router]);

    const handleSignIn = async () => {
      
        signIn({data:{email:emailOrId,password:password}});
    };
    
    
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
                {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailOrId">
                        Email or ID
                    </label>
                    <input
                        id="emailOrId"
                        type="text"
                        value={emailOrId}
                        onChange={(e) => setEmailOrId(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email or ID"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="text-center">
                    <button
                        onClick={()=>handleSignIn()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                </div>
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => router.push('/signup')}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
