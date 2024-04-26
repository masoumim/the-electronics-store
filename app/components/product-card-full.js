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
import Link from 'next/link.js';

const auth = getFirebaseAuth();

const ProductCardFull = ({ id, image, name, price, onSale, discountedPrice, productCode, inStock, url = '/' }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const contactsCtx = useContext(ctx); // The Context object
    const cart = contactsCtx[0]; // State object representing user's cart
    const setCart = contactsCtx[1]; // Setter to set cart

    const [showModal, setShowModal] = useState(false);

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
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // Redirect to sign-in page
            router.push('/sign-in');
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="product-card p-5 border border-gray-200 rounded-md shadow-sm w-72 mx-2">
                <img src={image} alt={name} className="object-cover h-64 w-full mx-auto rounded-md" />
                <div className="mt-4">
                    <Link href={url}>
                        <h2 className="text-lg font-bold hover:underline overflow-ellipsis overflow-hidden whitespace-nowrap">{name}</h2>
                    </Link>
                    {onSale ? (
                        <div className="flex items-center">
                            <p className="text-xl font-bold text-red-500 line-through mr-2">{price}</p>
                            <p className="text-green-500">{discountedPrice}</p>
                        </div>
                    ) : (
                        <p className="text-xl font-bold">{price}</p>
                    )}
                    <p className="text-gray-600 mt-2">{productCode}</p>
                    <p className={`text-sm font-semibold mt-2 ${inStock ? 'text-green-500' : 'text-red-500'}`}>{inStock ? "In Stock" : "Out of Stock"}</p>
                    <button onClick={handleAddToCart} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4 ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!inStock}>Add to Cart</button>
                </div>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded shadow-lg">
                            <p>Do you want to go to cart or continue shopping?</p>
                            <Link href="/cart">
                                <button onClick={handleCloseModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Go to Cart</button>
                            </Link>
                            <button onClick={handleCloseModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Continue Shopping</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCardFull;