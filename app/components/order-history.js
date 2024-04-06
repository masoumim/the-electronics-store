// order-history.js - This interactive component contains a list of orders for a signed-in user.

'use client'

import { useState, useEffect } from "react";
import { getFirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { checkBackendSignIn, getOrders } from "../api/api";
import router from "next/router";
const auth = getFirebaseAuth();

export default function OrderHistory() {

    // Initialize the state variables
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        async function fetchData() {
            console.log('order-history.js useEffect() called');

            // Get the current signed-in user
            const user = auth.currentUser;

            if (user) {
                console.log(`order-history.js called! auth.currentUser found = `);
                console.log(user);

                // Confirm user is signed in on the backend                
                console.log('checking if user is signed in on backend:');
                const backendUser = await checkBackendSignIn();
                console.log('backendUser = ');
                console.log(backendUser);
                if (backendUser) {
                    // Fetch the user's order history here
                    console.log(`calling getOrders()`)
                    try {
                        let fetchedOrderHistory = await getOrders();
                        console.log(`back from getOrders()`);

                        console.log(`fetchedOrderHistory =`);
                        console.log(fetchedOrderHistory);

                        // If fetchedOrderHistory is an empty array, show a message to the user
                        if (fetchedOrderHistory.length === 0) {
                            console.log('No orders found for this user.');
                            // You can also set a state variable here to show a message in your UI
                        } else {
                            setOrderHistory(fetchedOrderHistory);
                        }
                    } catch (error) {
                        console.log('Error fetching orders: ', error);
                    }
                }
            } else {
                // Get the current signed-in user using onAuthStateChanged
                onAuthStateChanged(auth, async (user) => {
                    console.log('order-history.js - onAuthStateChange() called!')
                    if (user) {
                        console.log('signed-in user onAuthStateChange found!');

                        // Check that user is signed-in in the backend
                        console.log('onAuthStateChange() - calling checkBackendSignIn()')
                        const backendUser = await checkBackendSignIn();

                        if (backendUser) {
                            // Fetch the user's order history here
                            console.log('onAuthStateChange() - backendUser found - calling getOrders()');
                            try {
                                let fetchedOrderHistory = await getOrders();
                                console.log('fetchedOrderHistory = ');
                                console.log(fetchedOrderHistory);

                                // If fetchedOrderHistory is an empty array, show a message to the user
                                if (fetchedOrderHistory.length === 0) {
                                    console.log('No orders found for this user.');
                                    // You can also set a state variable here to show a message in your UI
                                } else {
                                    setOrderHistory(fetchedOrderHistory);
                                }
                            } catch (error) {
                                console.log('Error fetching orders: ', error);
                            }
                        }
                    }
                    else {
                        // No signed-in user found
                        console.log(`No signed-in user found! Redirecting to /sign-in`);
                        router.push('/sign-in');
                    }
                })
            }
        }
        fetchData();
    }, [])

    // Fetch the orders when the component mounts
    useEffect(() => {
        async function fetchOrders() {
            try {
                const fetchedOrders = await getOrders();
                setOrders(fetchedOrders);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    // Check if the orders are still loading or if there was an error
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading orders</div>;

    // Render the order history
    return (
        <>
            <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Order History</h1>
            {orders.length === 0 ? (
                <p>You have no orders</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="w-full px-3 mb-4 bg-white shadow rounded">
                        <h2 className="text-gray-600 text-lg font-bold">Order #{order.id}</h2>
                        <p>Date: {order.order_date}</p>
                        <p>Total: {order.total}</p>
                        <p>Subtotal: {order.subtotal}</p>
                        <p>Taxes: {order.taxes}</p>
                        <p>Number of items: {order.num_items}</p>
                        {/* ... display the order details ... */}
                        <h3 className="text-gray-600 text-md font-bold mt-2">Products</h3>
                        {order.order_product.map((orderProduct, index) => (
                            <div key={index}>
                                <p>Product Name: {orderProduct.product.name}</p>
                                <p>Quantity: {orderProduct.quantity}</p>
                            </div>
                        ))}
                        <h3 className="text-gray-600 text-md font-bold mt-2">Shipping Address</h3>
                        <p>{order.shipping_street_address}, {order.shipping_unit}</p>
                        <p>{order.shipping_city}, {order.shipping_province}, {order.shipping_country}, {order.shipping_postal_code}</p>
                        <p>Phone: {order.shipping_phone_number}</p>
                        <h3 className="text-gray-600 text-md font-bold mt-2">Billing Address</h3>
                        <p>{order.billing_street_address}, {order.billing_unit}</p>
                        <p>{order.billing_city}, {order.billing_province}, {order.billing_country}, {order.billing_postal_code}</p>
                        <p>Phone: {order.billing_phone_number}</p>
                    </div>
                ))
            )}
        </>
    );
}