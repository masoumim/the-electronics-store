// header-signin-cart.js - This interactive component contains the sign in / 'your account' button and the user's cart

'use client'
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import Link from 'next/link'
const auth = getFirebaseAuth();

export default function HeaderSignInAndCart() {
    const [user, setUser] = useState();

    // Get current logged in user on page load
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('header-signin-cart.js onAuthStateChanged called!');
            if (user) {
                console.log('header-signin-cart.js - user found!');
                const signedInUser = {}
                signedInUser.email = user.email;
                setUser(signedInUser);
            } else {
                setUser(null);
            }
        });
    }, [])

    return (
        <>            
            {user ? <p><Link href="/account">Account</Link></p> : <p><Link href="/sign-in">Sign In</Link></p>}
            <Link href={'/cart'}>My Cart</Link>
        </>
    )
}
