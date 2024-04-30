// registration-form.js - This interactive component contains a form used for creating / registering new users.

'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, registerUser, signInNewUserBackend } from "../api/api";

const auth = getFirebaseAuth();

export default function RegistrationForm() {
    const [inputFirstName, setInputFirstName] = useState("");             // Form 'First Name' input from user
    const [inputLastName, setInputLastName] = useState("");               // Form 'First Name' input from user
    const [inputEmail, setInputEmail] = useState("");                   // Form 'email' input from user
    const [inputPassword, setInputPassword] = useState("");             // Form 'password' input from user
    const [errorMessage, setErrorMessage] = useState("");              // Error message from backend
    const router = useRouter();

    // If a user is signed-in, redirect them back to /account
    useEffect(() => {
        async function fetchData() {
            console.log('registration-form.js - Checking if there is a user already signed-in');

            // Get the current signed-in user            
            const user = auth.currentUser;

            if (user) {
                // Confirm user is signed in on the backend                                
                const backendUser = await checkBackendSignIn();
                if (backendUser) router.push('/account');
            } else {
                // Get the current signed-in user using onAuthStateChanged                
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        console.log('registration-form.js - onAuthStateChanged() called');

                        // Check that user is signed-in in the backend                        
                        const backendUser = await checkBackendSignIn();

                        // Redirect to /account                    
                        if (backendUser) router.push('/account');
                    }
                })
            }
        }
        fetchData();
    }, [])

    // Form Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Call Firebase's add user method
        createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;

                // Add user on backend
                try {
                    const addedUserBackend = await registerUser(inputFirstName, inputLastName, inputEmail, user.uid);

                    // Sign-in user on backend
                    console.log('calling signInNewUserBackend(addedUserBackend) where addedUserBackend = ');
                    console.log(addedUserBackend);
                    await signInNewUserBackend(addedUserBackend);

                    // Redirect to /account
                    router.push('/account');
                } catch (error) {
                    setErrorMessage(error.message);
                    setTimeout(() => setErrorMessage(''), 3000);  // Clear the error message after 3 seconds
                }
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('The email address is already in use by another account.');
                    setTimeout(() => setErrorMessage(''), 3000);  // Clear the error message after 3 seconds
                } else {
                    console.log(error);
                    throw error;
                }
            });
    }

    // Handle form input
    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        if (fieldName === "firstName") setInputFirstName(fieldValue);
        if (fieldName === "lastName") setInputLastName(fieldValue);
        if (fieldName === "email") setInputEmail(fieldValue);
        if (fieldName === "password") setInputPassword(fieldValue);
    }

    return (
        <div className="container mx-auto p-8 flex items-center justify-center">
            <div className="bg-white rounded-md shadow-lg p-10 max-w-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                First Name
                            </label>
                            <input onChange={handleInput} required minLength={1} maxLength={50} pattern="^[A-Za-z]{1,50}$" value={inputFirstName} name="firstName" id="grid-first-name" type="text" placeholder="" className="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-300" />
                            <p className="text-gray-600 text-xs italic">Letters only, 50 character max</p>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Last Name
                            </label>
                            <input onChange={handleInput} required minLength={1} maxLength={50} pattern="^[A-Za-z]{1,50}$" value={inputLastName} name="lastName" id="grid-last-name" type="text" placeholder="" className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-300" />
                            <p className="text-gray-600 text-xs italic">Letters only, 50 character max</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                Email Address
                            </label>
                            <input onChange={handleInput} required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" value={inputEmail} name="email" className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-300" id="grid-email" type="email" placeholder="" />
                            <p className="text-gray-600 text-xs italic">Your email address will be how we identify you</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Password
                            </label>
                            <input onChange={handleInput} required value={inputPassword} minLength={6} name="password" className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-300" id="grid-password" type="password" placeholder="******************" />
                            <p className="text-gray-600 text-xs italic">Password must be at least 6 characters long</p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline block w-full"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}