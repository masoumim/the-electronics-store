// product-card-full.js - This component is used to display a product card with the product image, name, price, product code, and stock status. 
// The user can add the product to the cart by clicking the "Add to Cart" button. If the product is on sale, the discounted price is displayed. 
// If the product is out of stock, the stock status is displayed as "Out of Stock". 
// The user can choose to go to the cart or continue shopping after adding the product to the cart.

'use client'

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation.js';
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, addProductToCart } from "../api/api.js";
import { ctx } from "./providers.js";

const auth = getFirebaseAuth();

const ProductCardFull = ({ id, image, name, price, onSale, discountedPrice, productCode, inStock }) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const contactsCtx = useContext(ctx); // The Context object
    const cart = contactsCtx[0]; // State object representing user's cart
    const setCart = contactsCtx[1]; // Setter to set cart

    useEffect(() => {
        async function fetchData() {
            // Get the current signed-in user            
            const user = auth.currentUser;
            if (user) {
                // Confirm user is signed in on the backend                                 
                const backendUser = await checkBackendSignIn();
                if (backendUser) {
                    setUser(user);
                }
            } else {
                // Get the current signed-in user using onAuthStateChanged                
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        // Check that user is signed-in in the backend                        
                        const backendUser = await checkBackendSignIn();
                        if (backendUser) {
                            setUser(user);
                        }
                    }
                })
            }
        }
        fetchData();
    }, [])

    // Add product to cart
    const handleAddToCart = async () => {
        if (user) {
            try {
                // Add the product to the cart
                await addProductToCart(id);

                // Update the cart in the state
                setCart(prevCart => {
                    return {
                        ...prevCart,
                        [id]: { image, name, price, onSale, discountedPrice, productCode, inStock }
                    };
                });

                setShowModal(true);
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // Redirect to sign-in page
            router.push('/sign-in');
        }
    };

    // Continue shopping
    const handleContinueShopping = () => {
        setShowModal(false);
    };

    // Go to cart
    const handleGoToCart = () => {
        router.push('/cart');
    };

    return (
        <div className="product-card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            {onSale ? <p className="price discounted">{discountedPrice}</p> : <p className="price">{price}</p>}
            <p className="product-code">{productCode}</p>
            <p className="stock-status">{inStock ? "In Stock" : "Out of Stock"}</p>
            <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add to Cart</button>
            {showModal && (
                <div className="modal">
                    <p>Do you want to go to cart or continue shopping?</p>
                    <button onClick={handleGoToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Go to Cart</button>
                    <button onClick={handleContinueShopping} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Continue Shopping</button>
                </div>
            )}
        </div>
    );
};

export default ProductCardFull;