// checkout-shipping.js - This component handles the Shipping step (1 of 4) of the checkout process.

'use client'
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, getPrimaryShippingAddress, getAlternateShippingAddress, createCheckoutSession } from "../api/api.js";
import { ctx } from "./providers.js";
import Link from "next/link.js";

const auth = getFirebaseAuth();

export default function CheckoutShipping() {
    const contactsCtx = useContext(ctx);                                                        // The Context object
    const cart = contactsCtx[0];                                                                // State object representing user's cart
    const setCart = contactsCtx[1];                                                             // Setter to set cart
    const cartProducts = contactsCtx[2];                                                        // State object representing user's cart
    const setCartProducts = contactsCtx[3];                                                     // Setter to set cart
    const [cartProductsInfo, setCartProductsInfo] = useState([]);                               // Array of cart product(s) info (name, price, description etc)  
    const [hasPrimaryShippingAddress, setHasPrimaryShippingAddress] = useState(false);          // Used for conditionally rendering the 'proceed to payment' button
    const [hasAlternateShippingAddress, setHasAlternateShippingAddress] = useState(false);      // Used for conditionally rendering the 'save alternate address' button
    const [primaryAddressSelected, setPrimaryAddressSelected] = useState(false);                // Used to set the 'Use primary address' radio button
    const [alternateAddressSelected, setAlternateAddressSelected] = useState(false);            // Used to set the 'Use alternate address' radio button
    const [alternateAddressFormFilled, setAlternateAddressFormFilled] = useState(false);        // Used to conditionally render the 'Save Alternate Address' button
    const [hasCheckoutSession, setHasCheckoutSession] = useState(false);                        // Used to prevent fetching user's Alternate Shipping Address before a Checkout Session has been created

    // Form input
    const [inputFirstName, setInputFirstName] = useState("");                           // Form input: 'First Name'
    const [inputLastName, setInputLastName] = useState("");                             // Form input: 'Last Name'
    const [inputStreetNumber, setInputStreetNumber] = useState("");                     // Form input: 'Street Number'
    const [inputStreetName, setInputStreetName] = useState("");                         // Form input: 'Street Name'
    const [inputUnit, setInputUnit] = useState("");                                     // Form input: 'Street Unit'
    const [inputCity, setInputCity] = useState("");                                     // Form input: 'City'
    const [inputProvince, setInputProvince] = useState("");                             // Form input: 'Province'
    const [inputCountry, setInputCountry] = useState("");                               // Form input: 'Country'
    const [inputPostalCode, setInputPostalCode] = useState("");                         // Form input: 'Postal Code'
    const [inputPhoneNumber, setInputPhoneNumber] = useState("");                       // Form input: 'Phone Number'
    const [primaryShippingAddress, setPrimaryShippingAddress] = useState({});           // The user's primary shipping address

    const router = useRouter();


    // If a user is signed-in, get cart info. Otherwise, redirect user to /sign-in page
    useEffect(() => {
        async function fetchData() {
            // Get the current signed-in user            
            const user = auth.currentUser;
            if (user) {
                // Confirm user is signed in on the backend                                
                const backendUser = await checkBackendSignIn();
                if (backendUser) {
                    // Get Cart info
                    const cartInfo = await getCartInfo();
                    setCart(cartInfo);
                    setCartProducts(cartInfo.cart_product);
                }
            } else {
                // Get the current signed-in user using onAuthStateChanged                
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        // Check that user is signed-in in the backend                        
                        const backendUser = await checkBackendSignIn();
                        if (backendUser) {
                            // Get Cart info
                            const cartInfo = await getCartInfo();
                            setCart(cartInfo);
                            setCartProducts(cartInfo.cart_product);
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


    useEffect(() => {
        async function fetchData() {
            // 1. Redirects user to home if they don't have any items in cart                    
            const fetchedCart = await getCartInfo();
            if (fetchedCart.num_items === 0) router.push('/');

            // 2. Check if user has a Checkout Session, If not, create one!
            const foundCheckoutSession = await getCheckoutSession();
            if (!foundCheckoutSession) {
                await createCheckoutSession();
                setHasCheckoutSession(true);
            }

            // 3. Fetch Primary Shipping Address

            // 4. Fetch Alternate Shipping Address

            
        }
        fetchData();
    }, [])






    return (
        <p>Hello</p>
    )



}