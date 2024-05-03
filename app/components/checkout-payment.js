// checkout-payment.js - This component handles the Payment step (3 of 4) of the checkout process.
// This component uses Stripe for the UI and payment processing

'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, updateCheckoutSessionStage, getProduct } from "../api/api.js";
import CheckoutSteps from "./checkout-steps.js";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { createStripeCheckoutSession } from "../api/api.js";

const auth = getFirebaseAuth();

export default function CheckoutPayment() {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const [clientSecret, setClientSecret] = useState('');
    const [cartProducts, setCartProducts] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false);   // Used to control fetches to getCheckoutSession(). Fetch won't execute if userLoggedIn is false.   
    const router = useRouter();

    // If a user isn't signed in, redirect to /sign-in page
    useEffect(() => {
        async function fetchData() {
            // Get the current signed-in user            
            const user = auth.currentUser;
            if (user) {
                // Confirm user is signed in on the backend                                
                const backendUser = await checkBackendSignIn();
                if (backendUser) {
                    setUserLoggedIn(true);
                }
            } else {
                // Get the current signed-in user using onAuthStateChanged                
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        // Check that user is signed-in in the backend                        
                        const backendUser = await checkBackendSignIn();
                        if (backendUser) {
                            setUserLoggedIn(true);
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

    // Redirects user to home if they don't have any items in cart
    useEffect(() => {
        async function fetchData() {
            // Fetch cart                      
            if (userLoggedIn) {
                const fetchedCart = await getCartInfo();
                if (fetchedCart.num_items === 0) router.push('/');
            }
        }
        fetchData();
    }, [userLoggedIn])

    // Make sure the user has a Checkout Session and the Checkout Session Stage is PAYMENT, otherwise, redirect user to Home
    useEffect(() => {
        async function fetchData() {
            if (userLoggedIn) {
                const currentCheckoutSession = await getCheckoutSession();
                if (!currentCheckoutSession || currentCheckoutSession.stage !== 'payment') router.push('/');
            }
        }
        fetchData();
    }, [userLoggedIn])

    // On page load, get the cart products and set the state variable 'cartProducts'
    useEffect(() => {
        async function fetchData() {
            if (userLoggedIn) {
                const cartInfo = await getCartInfo();
                setCartProducts(cartInfo.cart_product);
            }
        }
        fetchData();
    }, [userLoggedIn]);

    // Create a Stripe Checkout Session as soon as the page loads
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

                // Set the user's Checkout Session Stage to REVIEW
                await updateCheckoutSessionStage('review');
            }
        }
        fetchData();
    }, [cartProducts]);


    return (
        <>
            <div className="w-full sm:w-3/4 lg:w-1/2 xl:w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
                <div className="mx-auto w-full max-w-md mb-10 text-center">
                    {/* Render the Checkout Steps component */}
                    <CheckoutSteps currentStep={3} />
                </div>
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
            </div>
        </>
    )
}