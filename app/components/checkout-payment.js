// checkout-payment.js - This component handles the Payment step (3 of 4) of the checkout process.
// This component uses Stripe for the UI and payment processing

'use client'
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, getPrimaryShippingAddress, getAlternateShippingAddress, createCheckoutSession, addAlternateShippingAddress, updateAlternateShippingAddress, updateCheckoutSessionStage, updateCheckoutShippingAddress, addCheckoutShippingAddress, getProduct } from "../api/api.js";
import { ctx } from "./providers.js";
import Link from "next/link.js";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { stripeAddProduct, createStripeCheckoutSession } from "../api/api.js";

const auth = getFirebaseAuth();

export default function CheckoutPayment() {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const [clientSecret, setClientSecret] = useState('');
    const [cartProducts, setCartProducts] = useState([]);

    // On page load, get the cart products and set the state variable 'cartProducts'
    useEffect(() => {
        async function fetchData() {                      
            const cartInfo = await getCartInfo();
            setCartProducts(cartInfo.cart_product);
        }
        fetchData();
    }, []);

    // Create a Checkout Session as soon as the page loads
    useEffect(() => {
        async function fetchData() {                        
            const myLineItems = [];

            if (cartProducts.length > 0) {
                for (const product in cartProducts) {

                    // Get the product info
                    const prodInfo = await getProduct(cartProducts[product].product_id);

                    // Create an empty line item object
                    const lineItemObj = {};

                    // Populate the object with properties
                    const priceWithoutPeriod = parseInt(prodInfo.price.replace(".", ""));
                    lineItemObj.price_data = { currency: 'cad', product_data: { name: `${prodInfo.name}`, }, unit_amount: `${priceWithoutPeriod}` };
                    lineItemObj.quantity = cartProducts[product].quantity;
                    lineItemObj.tax_rates = ['txr_1OwS22RuVIAoskgq5JZGOmq3'];

                    myLineItems.push(lineItemObj);
                }

                // Create the Stripe Checkout Session
                const returnedClientSecret = await createStripeCheckoutSession(myLineItems);                
                setClientSecret(returnedClientSecret.client_secret);
            }
        }
        fetchData();
    }, [cartProducts]);


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