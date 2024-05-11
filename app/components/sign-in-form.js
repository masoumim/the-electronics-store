// sign-in-form.js - This interactive component contains the logic to sign-in a user and renders the sign-in form
'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { sendIdToken, checkBackendSignIn } from "../api/api";

const auth = getFirebaseAuth();

export default function SignInForm() {
    const [inputEmail, setInputEmail] = useState("");                   // Form 'email' input from user
    const [inputPassword, setInputPassword] = useState("");             // Form 'password' input from user
    const [signedInUserEmail, setSignedInUserEmail] = useState("");     // The email of the signed in user
    const router = useRouter();                                         // useRouter hook allows you to programmatically change routes inside Client Components

    // If user is already signed-in, redirect them to /account
    useEffect(() => {
        async function fetchData() {
            console.log('sign-in-form.js - Checking if there is a user already signed-in');

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
                        console.log('sign-in-form.js - onAuthStateChanged() called');

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

    // Check if user has successfully signed in:    
    useEffect(() => {
        if (signedInUserEmail && inputEmail) {
            if (signedInUserEmail === inputEmail) {
                console.log("user signed in successfully.. redirecting to /account");
                // Use Router hook to redirect user after sign in to the account page
                router.push('/account');
            }
        }
    }, [signedInUserEmail])

    // Form Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(`handleSubmit():`)
        console.log(`inputEmail: ${inputEmail}`);
        console.log(`inputPassword: ${inputPassword}`);
        console.log(`auth:`);
        console.log(auth);

        // Call Firebase's signInWithEmailAndPassword method
        signInWithEmailAndPassword(auth, inputEmail, inputPassword)
            .then((userCredential) => {
                // Signed in                
                console.log('sign-in-form.js - signInWithEmailAndPassword()');

                // Authorize user on the backend server
                auth.currentUser.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
                    // Send token to your backend via HTTPS
                    console.log('calling sendIdToken!');
                    await sendIdToken(idToken);
                    console.log('back from sendIdToken');

                    console.log(`calling setSignedInUserEmail`);
                    setSignedInUserEmail(userCredential.user.email);
                    console.log(`back from setSignedInUserEmail`);
                }).catch(function (error) {
                    console.log(`There was an error sending the idToken to the backend`);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`sign-in-form.js handleSubmit() threw an error:`);
                console.log(`error code: ${errorCode}, error msg: ${errorMessage}`);
            });
    }

    // Handle form input
    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        if (fieldName === "email") setInputEmail(fieldValue);
        if (fieldName === "password") setInputPassword(fieldValue);
    }

    return (
        <div className="container mx-auto p-8 flex items-center justify-center">
            <div className="bg-white rounded-md shadow-lg p-10 w-full max-w-sm">
                <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
                {/* Email Input */}
                <form onSubmit={handleSubmit} id="signInForm">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            onChange={handleInput}
                            value={inputEmail}
                            name="email"
                            id="email"
                            type="email"
                            className="shadow appearance-none border rounded w-full py-3 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300"
                            placeholder="your-email@example.com"
                            required
                        />
                    </div>
                    {/* Password Input */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            onChange={handleInput}
                            value={inputPassword}
                            name="password"
                            id="password"
                            type="password"
                            className="shadow appearance-none border rounded w-full py-3 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300"
                            placeholder="******************"
                            required
                        />
                    </div>
                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline block w-full"
                    >
                        Sign In
                    </button>
                </form>
                {/* Create Account Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">Don't have an account? </p>
                    <Link
                        href="/create-account"
                        className="text-blue-500 hover:underline"
                    >
                        Create an Account
                    </Link>
                </div>
            </div>
        </div>
    );
}