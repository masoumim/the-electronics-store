// header-signin-cart.js - This interactive component contains the sign in / 'your account' button and the user's cart

'use client'
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
const auth = getFirebaseAuth();

export default function HeaderSignInAndCart() {
    const [user, setUser] = useState("");

    const foo = 'foobar';
    // Get current logged in user on page load
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                setUser(user.email);
            } else {
                // User is signed out                
            }
        });
    }, [user])

    return (
        <>
            <p>sign in / your account link goes here</p>
            <p>your cart goes here</p>            
        </>
    )
}
