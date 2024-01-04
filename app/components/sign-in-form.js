// sign-in-form.js - This interactive component contains the logic sign-in and renders the sign-in form

'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { sendIdToken } from "../api/api";

const auth = getFirebaseAuth();

export default function SignInForm() {
    const [inputEmail, setInputEmail] = useState("");                   // Form 'email' input from user
    const [inputPassword, setInputPassword] = useState("");             // Form 'password' input from user
    const [signedInUserEmail, setSignedInUserEmail] = useState("");     // The email of the signed in user
    const router = useRouter();                                         // useRouter hook allows you to programmatically change routes inside Client Components

    // If a user is already signed in, redirect them to /account
    // useEffect(() => {
    //     onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             console.log('sign-in-form.js: user already signed in. redirecting to /account');
    //             router.push('/account');
    //         } else {
    //             // User is signed out                               
    //         }
    //     });
    // })

    // Check if user has successfully signed in:
    useEffect(() => {
        console.log('sign-in-form.js useEffect() called');
        if (signedInUserEmail && inputEmail) {
            if (signedInUserEmail === inputEmail) {
                console.log("user signed in successfully.. redirecting to /account");
                // Use Router hook to redirect user after sign in to the account page
                router.push('/account');
            }
        }
    })

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
                    throw error;
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`sign-in-form.js handleSubmit() threw an error:`);
                console.log(`error code: ${errorCode}, error msg: ${errorMessage}`);
                throw error;
            });
    }

    // Handle form input
    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        if (fieldName === "email") setInputEmail(fieldValue);
        if (fieldName === "password") setInputPassword(fieldValue);
    }

    // CONSIDER MAKING THIS SEPARATE SERVER COMPONENT
    return (
        <>
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} id="signInForm" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input onChange={handleInput} value={inputEmail} name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="your e-mail address" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input onChange={handleInput} value={inputPassword} name="password" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>

        </>
    )
}