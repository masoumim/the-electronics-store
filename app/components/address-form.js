// add-address-form.js - This interactive component contains a form used for creating a primary shipping address

'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, registerUser, signInNewUserBackend, getUserInfo } from "../api/api.js";

const auth = getFirebaseAuth();

export default function AddressForm() {
    const [inputFirstName, setInputFirstName] = useState("");             // Form 'First Name' input from user
    const [inputLastName, setInputLastName] = useState("");               // Form 'First Name' input from user
    const [inputStreetNumber, setInputStreetNumber] = useState("");
    const [user, setUser] = useState({});
    const router = useRouter();

    // Get current signed-in user on page load
    useEffect(() => {
        async function fetchData() {
            console.log('address-form.js useEffect() called');

            // Get the current signed-in user
            // *currentUser will return the current user after sign-in
            const user = auth.currentUser;

            if (user) {
                console.log(`address-form.js called! auth.currentUser found = `);
                console.log(user);

                // Confirm user is signed in on the backend                
                console.log('checking if user is signed in on backend:');
                const backendUser = await checkBackendSignIn();
                console.log('backendUser = ');
                console.log(backendUser);
                if (backendUser) {
                    // Get user info from the backend
                    console.log(`calling getUserInfo()`)
                    const fetchedUserInfo = await getUserInfo();
                    console.log(`back from getUserInfo()`);

                    console.log(`fetchedUserInfo =`);
                    console.log(fetchedUserInfo);

                    // TODO: If user is signed in and already has a primary address - redirect to /update-address
                    // check if user has a primary address...
                    // If user has primary address... redirect to /update-address
                    // If user doesn't have a primary address..
                    // then Set the User state variable...

                    // Set the User state variable
                    const returnedUser = {}
                    returnedUser.uid = user.uid;
                    returnedUser.email = user.email;
                    returnedUser.firstName = fetchedUserInfo.first_name;
                    returnedUser.lastName = fetchedUserInfo.last_name;

                    setUser(returnedUser);
                }
            } else {
                // Get the current signed-in user using onAuthStateChanged
                // *onAuthStateChanged will execute in this case when user closes / refreshes the 
                // browser window and they are still logged in on the frontend
                onAuthStateChanged(auth, async (user) => {
                    console.log('address-form.js - onAuthStateChange() called!')
                    if (user) {
                        console.log('signed-in user onAuthStateChange found!');

                        // Check that user is signed-in in the backend
                        console.log('onAuthStateChange() - calling checkBackendSignIn()')
                        const backendUser = await checkBackendSignIn();

                        // Set the User state variable                        
                        if (backendUser) {
                            // Get user info from the backend
                            console.log('onAuthStateChange() - backendUser found - calling getUserInfo()');
                            const fetchedUserInfo = await getUserInfo();
                            console.log('fetchedUserInfo = ');
                            console.log(fetchedUserInfo);

                            // TODO: If user is signed in and already has a primary address - redirect to /update-address
                            // check if user has a primary address...
                            // If user has primary address... redirect to /update-address
                            // If user doesn't have a primary address..
                            // then Set the User state variable...

                            // Set the User state variable
                            const returnedUser = {}
                            returnedUser.uid = user.uid;
                            returnedUser.email = user.email;
                            returnedUser.firstName = fetchedUserInfo.first_name;
                            returnedUser.lastName = fetchedUserInfo.last_name;

                            setUser(returnedUser);
                        }
                    }
                    else {
                        // No signed-in user found
                        console.log(`No signed-in user found! Redirecting to home "/"`);
                        router.push('/');
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
                const addedUserBackend = await registerUser(inputFirstName, inputLastName, inputEmail, user.uid);

                // Sign-in user on backend
                console.log('calling signInNewUserBackend(addedUserBackend) where addedUserBackend = ');
                console.log(addedUserBackend);
                await signInNewUserBackend(addedUserBackend);

                // Redirect to /account
                router.push('/account');
            })
            .catch((error) => {
                console.log(error);
                throw error;
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
            <p>ADDRESS FORM</p>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            First Name
                        </label>
                        <input onChange={handleInput} required minLength={1} maxLength={50} pattern="^[A-Za-z]{1,50}$" value={inputFirstName} name="firstName" id="grid-first-name" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
                        <p className="text-gray-600 text-xs italic">Letters only, 50 character max</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input onChange={handleInput} required minLength={1} maxLength={50} pattern="^[A-Za-z]{1,50}$" value={inputLastName} name="lastName" id="grid-last-name" type="text" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <p className="text-gray-600 text-xs italic">Letters only, 50 character max</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street-number">
                            Street Number
                        </label>
                        <input onChange={handleInput} required min={1} value={inputStreetNumber} name="street-number" id="street-number" type="number" placeholder="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Sign Up
                </button>
            </form>
        </>
    )
}