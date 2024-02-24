// checkout-shipping.js - This component handles the Shipping step (1 of 4) of the checkout process.

'use client'
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getProduct, deleteProductFromCart } from "../api/api.js";
import CartProduct from "./cart-product.js";
import { ctx } from "./providers.js";
import Link from "next/link.js";

const auth = getFirebaseAuth();

export default function CheckoutShipping() {
    const contactsCtx = useContext(ctx);                                                // The Context object
    const cart = contactsCtx[0];                                                        // State object representing user's cart
    const setCart = contactsCtx[1];                                                     // Setter to set cart
    const cartProducts = contactsCtx[2];                                                // State object representing user's cart
    const setCartProducts = contactsCtx[3];                                             // Setter to set cart
    const [cartProductsInfo, setCartProductsInfo] = useState([]);                       // Array of cart product(s) info (name, price, description etc)  
    const [shippingAddressSelected, setShippingAddressSelected] = useState(false);      // Used for conditionally rendering the 'proceed to payment' button
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
                    setCartProducts(cartInfo.cart_product);
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
                            setCartProducts(cartInfo.cart_product);
                        }
                    }
                    else {
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

            {/* TODO: Render two radio buttons. Radio 1 is for 'my saved address' and Radio 2 renders a form for entering an alternative shipping address*/}
            <b>Shipping Info:</b>
            <br />
            
            {shippingAddressSelected ?
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to Payment</button>
                :
                <button disabled={true} className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to Payment</button>
            }
        </>
    )
}