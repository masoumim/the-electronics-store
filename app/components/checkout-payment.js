// checkout-payment.js - This component handles the Payment step (2 of 4) of the checkout process.
// This includes entering credit card information and confirming billing address.

'use client'
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, getPrimaryShippingAddress, getAlternateShippingAddress, createCheckoutSession, addAlternateShippingAddress, updateAlternateShippingAddress, updateCheckoutSessionStage, updateCheckoutShippingAddress, addCheckoutShippingAddress } from "../api/api.js";
import { ctx } from "./providers.js";
import Link from "next/link.js";
import { loadStripe } from "@stripe/stripe-js";
import { stripeAddProduct } from "../api/api.js";


const auth = getFirebaseAuth();

export default function CheckoutPayment() {

    
    // // TESTING ADD PRODUCT TO STRIPE
    // useEffect(() => {
    //     async function fetchData() {
    //         const testProduct = {}
    //         testProduct.name = "test product 1"
    //         await stripeAddProduct(testProduct);
    //     }
    //     fetchData();
    // }, [])

    return (<>
        <p>Checkout: Payment</p>
        <p>=====================================</p>
        <p>Stripe Test:</p>
        <p>------------</p>

        <p>=====================================</p>





        <input id="cardholder-name" type="text"></input>
        <div id="card-element"></div>
        <div id="card-result"></div>
        <button id="card-button">Save Card</button>






    </>
    )
}