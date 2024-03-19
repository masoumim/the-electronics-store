// checkout-billing.js - This component handles the Billing step (2 of 4) of the checkout process.

'use client'
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, getPrimaryShippingAddress, getAlternateShippingAddress, createCheckoutSession, addAlternateShippingAddress, updateAlternateShippingAddress, updateCheckoutSessionStage, updateCheckoutShippingAddress, addCheckoutShippingAddress, getBillingAddress } from "../api/api.js";
import { ctx } from "./providers.js";
import Link from "next/link.js";



const auth = getFirebaseAuth();

export default function CheckoutBilling() {

    const [billingAddress, setBillingAddress] = useState({});
    const [hasBillingAddress, setHasBillingAddress] = useState(false);
    const router = useRouter();

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
                    <br/>
                    <br/>
                    <button onClick={proceedToPayment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to Payment</button>
                </>
                :
                <>
                    <br/>
                    <Link href={"/add-billing"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Billing Address</Link>
                    <br/>
                    <br/>
                    <button disabled={true} className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to Payment</button>
                </>
            }
        </>
    )
}