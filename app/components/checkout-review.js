// checkout-review.js - This component handles the Review step (4 of 4) of the checkout process.
'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getCheckoutSession, getProduct, createOrder, getAddressById } from "../api/api.js";
import CheckoutSteps from "./checkout-steps.js";
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
    const [orderCreated, setOrderCreated] = useState(false);
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
            const productsArray = await Promise.all(orderProducts.map(async product => {
                const fetchedProduct = await getProduct(product.product_id);
                return {
                    id: fetchedProduct.id,
                    name: fetchedProduct.name,
                    price: fetchedProduct.price
                };
            }));

            setProducts(productsArray);
        }
        fetchData();
    }, [orderProducts])

    // Get the checkout session shipping and billing addresses
    useEffect(() => {
        async function fetchData() {
            if (checkoutSessionInfo) {
                console.log('checkoutSessionInfo:', checkoutSessionInfo);

                const checkoutShippingInfo = await getAddressById(checkoutSessionInfo.user_id, checkoutSessionInfo.shipping_address_id);
                console.log('checkoutShippingInfo:', checkoutShippingInfo);

                if (checkoutShippingInfo && checkoutShippingInfo.street_number && checkoutShippingInfo.street_name) {
                    checkoutShippingInfo.address = `${checkoutShippingInfo.street_number} ${checkoutShippingInfo.street_name}`;
                    console.log('checkoutShippingInfo after address set:', checkoutShippingInfo);
                }

                const checkoutBillingInfo = await getAddressById(checkoutSessionInfo.user_id, checkoutSessionInfo.billing_address_id);
                setOrderShippingAddress(checkoutShippingInfo);
                setOrderBillingAddress(checkoutBillingInfo);

                console.log('orderShippingAddress after set:', orderShippingAddress);
            }
        }
        fetchData();
    }, [checkoutSessionInfo])

    // Create the order
    useEffect(() => {
        async function fetchData() {
            // We need to make sure the user is logged in, the checkout session info is available, the order products are available, and the shipping and billing addresses are available before creating the order
            if (!orderCreated && userLoggedIn && checkoutSessionInfo && orderProducts.length > 0 && orderShippingAddress && orderBillingAddress) {
                console.log('Creating order with:', userLoggedIn, checkoutSessionInfo, orderProducts, orderShippingAddress, orderBillingAddress, orderCreated);
                await createOrder();
                setOrderCreated(true);
            }
        }
        fetchData();
    }, [userLoggedIn, checkoutSessionInfo, orderProducts, orderShippingAddress, orderBillingAddress, orderCreated]) // Add orderCreated to the dependency array

    return (
        <>
            <div className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
                <div className="mx-auto w-full max-w-md mb-10 text-center">
                    {/* Render the Checkout Steps component */}
                    <CheckoutSteps currentStep={4} />
                </div>
                <div className="flex items-center flex-col md:flex-row">
                    <div className="w-full sm:w-1/2 flex justify-center mb-8 md:mb-0">
                        <div className="sm:max-w-xs">
                            <p className="text-xl font-bold mb-4">Your Order Summary:</p>
                            <ul className="list-disc list-inside text-left text-sm">
                                {products.map((product) => (
                                    <li key={product.id} className="whitespace-nowrap overflow-hidden overflow-ellipsis">{product.name} - <b>${product.price}</b></li>
                                ))}
                            </ul>
                            <br />
                            <p className="text-sm"><b>subtotal:</b> {orderSubtotal}</p>
                            <p className="text-sm"><b>taxes:</b> {orderTaxes}</p>
                            <p className="text-sm"><b>total:</b> {orderTotal}</p>
                        </div>
                    </div>
                    <div className="w-full mx-5 sm:w-1/2 flex justify-center">
                        <div className="sm:max-w-xs flex flex-row">
                            <div className="w-full sm:w-1/2 pr-2">
                                <p className="text-lg font-bold mb-2">Shipping:</p>
                                <p className="text-sm">{orderShippingAddress.address}</p>
                                <p className="text-sm">{orderShippingAddress.city}, {orderShippingAddress.province}</p>
                                <p className="text-sm">{orderShippingAddress.country}</p>
                                <p className="text-sm">{orderShippingAddress.postal_code}</p>
                            </div>
                            <div className="w-full sm:w-1/2 pl-2">
                                <p className="text-lg font-bold mb-2">Billing:</p>
                                <p className="text-sm">{orderBillingAddress.address}</p>
                                <p className="text-sm">{orderBillingAddress.city}, {orderBillingAddress.province}</p>
                                <p className="text-sm">{orderBillingAddress.country}</p>
                                <p className="text-sm">{orderBillingAddress.postal_code}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}