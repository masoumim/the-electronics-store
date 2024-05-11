// checkout-billing.js - This component handles the Billing step (2 of 4) of the checkout process.
'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, updateCheckoutSessionStage, getBillingAddress, addCheckoutBillingAddress } from "../api/api.js";
import CheckoutSteps from "./checkout-steps.js";
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
            <div className="sm:w-3/4 lg:w-1/2 xl:w-3/5 2xl:w-4/5 h-full sm:h-3/4 lg:h-full xl:h-full 2xl:h-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
                <div className="mx-auto w-full max-w-md mb-10 text-center">
                    {/* Render the Checkout Steps component */}
                    <CheckoutSteps currentStep={2} />
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        {/* Billing Address */}
                        <p className="text-xl font-bold mb-2">Billing Address</p>
                        {hasBillingAddress ?
                            <>
                                <p className="text-gray-700 font-semibold">First name: <span className="font-normal">{billingAddress.first_name}</span></p>
                                <p className="text-gray-700 font-semibold">Last name: <span className="font-normal">{billingAddress.last_name}</span></p>
                                <p className="text-gray-700 font-semibold">Address: <span className="font-normal">{billingAddress.address}</span></p>
                                <p className="text-gray-700 font-semibold">Unit: <span className="font-normal">{billingAddress.unit}</span></p>
                                <p className="text-gray-700 font-semibold">City: <span className="font-normal">{billingAddress.city}</span></p>
                                <p className="text-gray-700 font-semibold">Province: <span className="font-normal">{billingAddress.province}</span></p>
                                <p className="text-gray-700 font-semibold">Country: <span className="font-normal">{billingAddress.country}</span></p>
                                <p className="text-gray-700 font-semibold">Postal code: <span className="font-normal">{billingAddress.postal_code}</span></p>
                                <p className="text-gray-700 font-semibold">Phone number: <span className="font-normal">{billingAddress.phone_number}</span></p>
                                <br />
                                <Link href={"/add-billing"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</Link>
                            </>
                            :
                            <>
                                <p className="mb-2">No billing address found, click the button below to create one.</p>
                                <Link href={"/add-billing"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Billing Address</Link>
                            </>
                        }
                    </div>
                </div>
                {/* Proceed to Payment Button */}
                <div className="flex justify-end mt-5">
                    {hasBillingAddress ?
                        <button onClick={proceedToPayment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to Payment</button>
                        :
                        <button disabled={true} className="bg-gray-500 text-white font-bold py-2 px-4 mt-52 rounded focus:outline-none focus:shadow-outline">Proceed to Payment</button>
                    }
                </div>
            </div>
        </>
    )
}