// change-password-form.js - This interactive component contains the logic for changing a user's password and renders a corresponding change password form

'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, updatePassword } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getUserInfo } from "../api/api.js";

const auth = getFirebaseAuth();

export default function ChangePasswordForm() {
    const [inputPassword, setInputPassword] = useState("");
    const [inputConfirmPassword, setInputConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [user, setUser] = useState({}); // TODO: Delete this?
    const router = useRouter();                                         // useRouter hook allows you to programmatically change routes inside Client Components

    // Get current signed-in user on page load
    useEffect(() => {
        async function fetchData() {
            // Get the current signed-in user
            // *currentUser will return the current user after sign-in
            const user = auth.currentUser;

            if (user) {
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

    // Checks if passwords match and sets state variables
    useEffect(() => {
        if (inputPassword || inputConfirmPassword) {
            if (inputPassword === inputConfirmPassword) {
                setPasswordsMatch(true);
            }
            else {
                setPasswordsMatch(false);
            }
        }
    })

    // Form Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        
        // If passwords match, update password using Firebase's updatePassword method
        if (inputPassword === inputConfirmPassword) {
            updatePassword(user, inputPassword).then(() => {
                // Update successful
                router.push('/account');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    // Handle form input
    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        if (fieldName === "new-password") setInputPassword(fieldValue);
        if (fieldName === "confirm-password") setInputConfirmPassword(fieldValue);
    }

    return (
        <>
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} id="change-password-form" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                            Enter new password
                        </label>
                        <input onChange={handleInput} value={inputPassword} name="new-password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="new-password" type="password" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirm new password
                        </label>
                        <input onChange={handleInput} value={inputConfirmPassword} name="confirm-password" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirm-password" type="password" />
                    </div>
                    <div className="flex items-center justify-between">
                        {passwordsMatch ?
                            // If passwords match, render enabled submit button
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Change Password</button>
                            :
                            // Otherwise, render a disabled (grayed-out) submit button
                            <button disabled={true} className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Change Password</button>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}