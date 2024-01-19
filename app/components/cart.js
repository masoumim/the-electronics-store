// cart.js - This component represents the user's Cart.

'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo } from "../api/api.js";

const auth = getFirebaseAuth();

export default function Cart() {
    const [cart, setCart] = useState({});
    const router = useRouter();

    // If a user is signed-in, get cart info. Otherwise, redirect user to /sign-in page
    useEffect(() => {
        async function fetchData() {
            // Get the current signed-in user            
            const user = auth.currentUser;

            if (user) {                
                // Confirm user is signed in on the backend                                
                const backendUser = await checkBackendSignIn();

                if (backendUser) {
                    // Get Cart info
                    const cartInfo = await getCartInfo();
                    setCart(cartInfo);
                }
            } else {
                // Get the current signed-in user using onAuthStateChanged                
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        // Check that user is signed-in in the backend                        
                        const backendUser = await checkBackendSignIn();
                                            
                        if (backendUser) {
                            // Get Cart info
                            const cartInfo = await getCartInfo();
                            setCart(cartInfo);
                            console.log(cartInfo);
                            
                        }
                    }
                    else{
                        // Redirect user to /sign-in page
                        router.push('/sign-in')
                    }
                })
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <p>My Cart:</p>
            
            <p>Number of Items: {cart.num_items}</p>
            <p>Subtotal: {cart.subtotal}</p>
            
        </>
    )
}