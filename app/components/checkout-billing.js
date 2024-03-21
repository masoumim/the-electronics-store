// checkout-billing.js - This component handles the Billing step (2 of 4) of the checkout process.

'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, updateCheckoutSessionStage, getBillingAddress, addCheckoutBillingAddress } from "../api/api.js";
import Link from "next/link.js";

const auth = getFirebaseAuth();

export default function CheckoutBilling() {

    const [billingAddress, setBillingAddress] = useState({});               // The user's billing address
    const [hasBillingAddress, setHasBillingAddress] = useState(false);      // Used to conditionally render the billing address 
    const [userLoggedIn, setUserLoggedIn] = useState(false);                // Used to control fetches to getCheckoutSession(). Fetch won't execute if userLoggedIn is false.   
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

    // Make sure the user has a Checkout Session and the Checkout Session Stage is BILLING, otherwise, redirect user to Home
    useEffect(() => {
        async function fetchData() {
            if (userLoggedIn) {
                const currentCheckoutSession = await getCheckoutSession();
                if (!currentCheckoutSession || currentCheckoutSession.stage !== 'billing') router.push('/');
            }
        }
        fetchData();
    }, [userLoggedIn]);

    // Fetch users Billing Address
    useEffect(() => {
        async function fetchData() {
            const fetchedBilling = await getBillingAddress();
            if (fetchedBilling) {
                console.log(fetchedBilling);
                setHasBillingAddress(true);
                setBillingAddress(fetchedBilling);
            }
            else {
                console.log('no billing address!');
                setHasBillingAddress(false);
            }
        }
        fetchData();
    }, [])

    // Redirects user to the Payment page
    async function proceedToPayment() {
        // Update user's checkout session stage to: PAYMENT
        await updateCheckoutSessionStage("payment");

        // Set the user's checkout session's billing address        
        await addCheckoutBillingAddress(billingAddress.id);

        // Redirect to Payment Page:
        router.push('/checkout-payment');
    }

    return (
        <>
            {hasBillingAddress ?
                <>
                    <p>*Your billing address:*</p>
                    <p>First name: {billingAddress.first_name}</p>
                    <p>Last name: {billingAddress.last_name}</p>
                    <p>Address: {billingAddress.address}</p>
                    <p>Unit: {billingAddress.unit}</p>
                    <p>City: {billingAddress.city}</p>
                    <p>Province: {billingAddress.province}</p>
                    <p>Country: {billingAddress.country}</p>
                    <p>Postal code: {billingAddress.postal_code}</p>
                    <p>Phone number: {billingAddress.phone_number}</p>
                    <Link href={"/add-billing"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</Link>
                    <br />
                    <br />
                    <button onClick={proceedToPayment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to Payment</button>
                </>
                :
                <>
                    <br />
                    <Link href={"/add-billing"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Billing Address</Link>
                    <br />
                    <br />
                    <button disabled={true} className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to Payment</button>
                </>
            }
        </>
    )
}