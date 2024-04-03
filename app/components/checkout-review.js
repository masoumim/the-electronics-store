// checkout-review.js - This component handles the Review step (4 of 4) of the checkout process.

'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, getPrimaryShippingAddress, getProduct, getBillingAddress, createOrder } from "../api/api.js";
const auth = getFirebaseAuth();

export default function CheckoutReview() {

    const [userLoggedIn, setUserLoggedIn] = useState(false);   // Used to control fetches in useEffect() hooks
    const [orderProducts, setOrderProducts] = useState([]);
    const [orderSubtotal, setOrderSubtotal] = useState('');
    const [orderTaxes, setOrderTaxes] = useState('');
    const [orderTotal, setOrderTotal] = useState('');
    const [products, setProducts] = useState([]);
    const [checkoutSessionInfo, setCheckoutSessionInfo] = useState();
    const [orderShippingAddress, setOrderShippingAddress] = useState({});
    const [orderBillingAddress, setOrderBillingAddress] = useState({});
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

    // Make sure the user has a Checkout Session and the Checkout Session Stage is REVIEW, otherwise, redirect user to Home
    useEffect(() => {
        async function fetchData() {
            if (userLoggedIn) {
                const currentCheckoutSession = await getCheckoutSession();
                setCheckoutSessionInfo(currentCheckoutSession);
                if (!currentCheckoutSession || currentCheckoutSession.stage !== 'review') router.push('/');
            }
        }
        fetchData();
    }, [userLoggedIn])

    // Get the user's cart info
    useEffect(() => {
        async function fetchData() {
            // Fetch cart                      
            if (userLoggedIn) {
                const fetchedCart = await getCartInfo();
                if (fetchedCart.num_items === 0) router.push('/');

                setOrderProducts(fetchedCart.cart_product);
                setOrderSubtotal(fetchedCart.subtotal);
                setOrderTaxes(fetchedCart.taxes);
                setOrderTotal(fetchedCart.total);
            }
        }
        fetchData();
    }, [userLoggedIn])

    // Get info about each product the user purchased
    useEffect(() => {
        async function fetchData() {
            // Get info on each product and store it in array 
            const productsArray = [];
            orderProducts.forEach(async product => {
                // Fetch the product info
                const fetchedProduct = await getProduct(product.product_id)
                console.log(fetchedProduct);
                // Store info in an object
                const prodObj = {};
                prodObj.id = fetchedProduct.id;
                prodObj.name = fetchedProduct.name;
                prodObj.price = fetchedProduct.price;

                // Store the object in array
                productsArray.push(prodObj);
            }
            )

            // Set 'products' state variable using the productsArray
            setProducts(productsArray);
        }
        fetchData();
    }, [orderProducts])

    // Get the checkout session shipping and billing addresses
    useEffect(() => {
        async function fetchData() {
            if (checkoutSessionInfo) {
                const checkoutShippingInfo = await getPrimaryShippingAddress(checkoutSessionInfo.shipping_address_id);
                const checkoutBillingInfo = await getBillingAddress(checkoutSessionInfo.billing_address_id);
                setOrderShippingAddress(checkoutShippingInfo);
                setOrderBillingAddress(checkoutBillingInfo);
            }
        }
        fetchData();
    }, [checkoutSessionInfo])

    // // Create an Order
    // useEffect(() => {
    //     async function fetchData() {
    //         await createOrder();
    //     }
    //     fetchData();
    // }, [])

    // Create an Order
    useEffect(() => {
        async function fetchData() {
            // We need to make sure the user is logged in, the checkout session info is available, the order products are available, and the shipping and billing addresses are available before creating the order
            if (userLoggedIn && checkoutSessionInfo && orderProducts.length > 0 && orderShippingAddress && orderBillingAddress) {
                await createOrder();
            }
        }
        fetchData();
    }, [userLoggedIn, checkoutSessionInfo, orderProducts, orderShippingAddress, orderBillingAddress])

    return (
        <>
            <p className="text-xl font-bold">Your Order Summary:</p>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name} - <b>${product.price}</b></li>
                ))}
            </ul>
            <br />
            <p><b>subtotal:</b> {orderSubtotal}</p>
            <p><b>taxes:</b> {orderTaxes}</p>
            <p><b>total:</b> {orderTotal}</p>
            <br />
            <p><b>Shipping:</b></p>
            <p>{orderShippingAddress.address}</p>
            <p>{orderShippingAddress.city}, {orderShippingAddress.province}</p>
            <p>{orderShippingAddress.country}</p>
            <p>{orderShippingAddress.postal_code}</p>
            <br />
            <p><b>Billing:</b></p>
            <p>{orderBillingAddress.address}</p>
            <p>{orderBillingAddress.city}, {orderBillingAddress.province}</p>
            <p>{orderBillingAddress.country}</p>
            <p>{orderBillingAddress.postal_code}</p>
        </>
    )
}