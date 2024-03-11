// checkout-payment.js - This component handles the Payment step (2 of 4) of the checkout process.

'use client'
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, getPrimaryShippingAddress, getAlternateShippingAddress, createCheckoutSession, addAlternateShippingAddress, updateAlternateShippingAddress, updateCheckoutSessionStage, updateCheckoutShippingAddress, addCheckoutShippingAddress } from "../api/api.js";
import { ctx } from "./providers.js";
import Link from "next/link.js";


const auth = getFirebaseAuth();

export default function CheckoutPayment() {

    
    // STRIPE TEST: 
    const stripe = require('stripe')('sk_test_51OsEAbRuVIAoskgq73WAKzLQSk4xfAvCfpw5oUmmlw7mUNMiaVFqoRqJPrf8yZY2lNNMjXgN3k3jeoBdrFjD7v8600EaAjEsmY');
    stripe.products.create({
        name: 'Starter Subscription',
        description: '$12/Month subscription',
    }).then(product => {
        stripe.prices.create({
            unit_amount: 1200,
            currency: 'usd',
            recurring: {
                interval: 'month',
            },
            product: product.id,
        }).then(price => {
            console.log('Success! Here is your starter subscription product id: ' + product.id);
            console.log('Success! Here is your starter subscription price id: ' + price.id);
        });
    });

    return (<>
        <p>Checkout: Payment</p>
        <p>=====================================</p>
        <p>Stripe Test:</p>
        <p>------------</p>
        
        <p>=====================================</p>

    </>
    )
}