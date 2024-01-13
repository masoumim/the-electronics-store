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

        // Validate input?
        // Backend validation is already in place. Just use client-side form validation

        // Call Firebase's add user method
        createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;                
                
                // Add user on backend
                const addedUserBackend =  await registerUser(inputFirstName, inputLastName, inputEmail, user.uid);
                                              
                // Sign-in user on backend
                console.log('calling signInNewUserBackend(addedUserBackend) where addedUserBackend = ');
                console.log(addedUserBackend);
                await signInNewUserBackend(addedUserBackend);
                
                // Redirect to /account
                router.push('/account');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
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
        <>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            First Name
                        </label>
                        <input onChange={handleInput} value={inputFirstName} name="firstName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input onChange={handleInput} value={inputLastName} name="lastName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                            Email Address
                        </label>
                        <input onChange={handleInput} value={inputEmail} name="email" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="" />
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Password
                        </label>
                        <input onChange={handleInput} value={inputPassword} name="password" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Sign Up
                </button>
            </form>
        </>
    )
}