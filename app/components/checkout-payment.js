// checkout-payment.js - This component handles the Payment step (3 of 4) of the checkout process.
// This component uses Stripe for the UI and payment processing

'use client'
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, getPrimaryShippingAddress, getAlternateShippingAddress, createCheckoutSession, addAlternateShippingAddress, updateAlternateShippingAddress, updateCheckoutSessionStage, updateCheckoutShippingAddress, addCheckoutShippingAddress } from "../api/api.js";
import { ctx } from "./providers.js";
import Link from "next/link.js";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { stripeAddProduct, createStripeCheckoutSession } from "../api/api.js";

const auth = getFirebaseAuth();

export default function CheckoutPayment() {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const [clientSecret, setClientSecret] = useState('');

    // Create a Stripe Checkout Session
    useEffect(() => {
        async function fetchData() {
            // Create a Checkout Session as soon as the page loads        
            const returnedClientSecret = await createStripeCheckoutSession();
            console.log(returnedClientSecret);
            setClientSecret(returnedClientSecret.client_secret);
        }
        fetchData();

    }, []);

    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise.then(stripe => stripe)} // Use resolved Stripe object
                    options={{ clientSecret }} // Pass options correctly
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    )
}