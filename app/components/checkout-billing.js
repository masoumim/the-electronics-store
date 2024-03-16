// checkout-billing.js - This component handles the Billing step (2 of 4) of the checkout process.

'use client'
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, getPrimaryShippingAddress, getAlternateShippingAddress, createCheckoutSession, addAlternateShippingAddress, updateAlternateShippingAddress, updateCheckoutSessionStage, updateCheckoutShippingAddress, addCheckoutShippingAddress } from "../api/api.js";
import { ctx } from "./providers.js";
import Link from "next/link.js";


const auth = getFirebaseAuth();

export default function CheckoutBilling() {
    return(
        <>
        Billing form goes here!
        </>
    )
}