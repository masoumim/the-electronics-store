// cart.js - This component represents the user's Cart.

'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getProduct, addProductToCart } from "../api/api.js";

const auth = getFirebaseAuth();

export default function Cart() {
    const [cart, setCart] = useState({});
    const [cartProducts, setCartProducts] = useState(null);
    const [cartProductsInfo, setCartProductsInfo] = useState(null);
    const [qty, setQty] = useState();
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


    // Get Product info for each product in the user's Cart
    useEffect(() => {
        async function fetchData() {
            if (cartProducts) {
                const fetchedProductsInfo = [];

                // Iterate over each product in the cartProducts[] array
                for (let product of cartProducts) {
                    const productInfo = {};

                    // Get the product id and quantity
                    productInfo.productID = product.product_id;
                    productInfo.quantity = product.quantity;

                    // Fetch the product info
                    const fetchedProduct = await getProduct(product.product_id);

                    // Get the product info from the fetched product
                    productInfo.name = fetchedProduct.name;
                    productInfo.description = fetchedProduct.description;
                    productInfo.discountPercent = fetchedProduct.discount_percent;
                    productInfo.price = fetchedProduct.price;

                    // Add this fetched product to the array
                    fetchedProductsInfo.push(productInfo);
                }

                // Set the Cart Products Info array
                setCartProductsInfo(fetchedProductsInfo);
            }
        }
        fetchData();
    }, [cartProducts])

    

    return (
        <>
            <p>My Cart:</p>
            {cartProductsInfo ?
                <>
                    {/* Iterate over cartProductsInfo[] and display each product's properties */}
                    {cartProductsInfo.map((product, index) =>
                        <div key={index}>
                            <p>Name: {product.name}</p>
                            <p>Description: {product.description}</p>
                            <p>Price: {product.price}</p>
                            <p>Discount: {product.discountPercent}</p>
                            <p>Quantity: {product.quantity}</p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">-</button>
                            <button onClick={() => addProductToCart(product.productID)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">+</button>
                            <br />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Remove</button>
                        </div>
                    )}
                </>
                :
                <p>No Cart!</p>}
            <p>Number of Items: {cart.num_items}</p>
            <p>Subtotal: {cart.subtotal}</p>
            <p>Taxes: {cart.taxes}</p>
            <p>Total: {cart.total}</p>
        </>
    )
}