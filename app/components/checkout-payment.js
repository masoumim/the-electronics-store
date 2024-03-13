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


const auth = getFirebaseAuth();

export default function CheckoutPayment() {

    // STRIPE TEST:
    let stripe;

    useEffect(() => {
        async function getStripeObject() {
            stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        }
        getStripeObject();
    }, [])

    // const elements = stripe.elements();
    // const cardElement = elements.create('card');
    // cardElement.mount('#card-element');

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