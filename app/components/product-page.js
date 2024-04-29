// product-page.js - This component will display a single product. It is used to render the product details based on the product ID.
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation.js';
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { getProduct, addProductToCart, checkBackendSignIn } from '../api/api.js';

const auth = getFirebaseAuth();

export default function ProductPage({ id }) {
    const [product, setProduct] = useState(null);
    const [supplementaryProductInfo, setSupplementaryProductInfo] = useState(null);
    const [user, setUser] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const router = useRouter();

    // Get the current signed-in user
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

    // Fetch product and supplementary product info
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProduct(id);
            setProduct(fetchedProduct);
        };

        const fetchSupplementaryProductInfo = async () => {
            const response = await fetch('/product_info.json');
            if (!response.ok) {
                console.error(`Failed to fetch supplementary product info: ${response.statusText}`);
                return;
            }
            const products = await response.json();
            const fetchedProductInfo = products.find(product => product.id === Number(id));
            setSupplementaryProductInfo(fetchedProductInfo);
        };

        fetchProduct();
        fetchSupplementaryProductInfo();
    }, [id]);

    // Add product to cart, if user is signed in. Otherwise, redirect to sign-in page
    const handleAddToCart = async () => {
        if (!user) {
            router.push('/sign-in');
            return;
        }
        try {
            await addProductToCart(product.id);
            setStatusMessage('Product added to cart');
            setTimeout(() => setStatusMessage(''), 3000); // Remove the message after 3 seconds
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {product && supplementaryProductInfo && (
                <div className="flex flex-col items-center">
                    {/* Product Image and Info */}
                    <div className="flex flex-row items-start justify-center w-full mx-auto bg-white rounded-lg shadow-md mt-10 p-6">
                        <div className="w-1/2 p-4">
                            <img className="w-full h-96 object-cover mb-4" src={product.img_url} alt={product.name} />
                        </div>
                        <div className="w-1/2 p-4">
                            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                            <p className="mb-2">{product.description}</p>
                            <p className="font-bold text-2xl text-green-500 py-2">Price: ${product.price}</p>
                            <p className="mb-2">Product Code: {product.item_code}</p>
                            <p className={product.inventory > 0 ? 'text-green-500' : 'text-red-500'}>{product.inventory > 0 ? 'In Stock' : 'Out of Stock'}</p>
                            <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add to Cart</button>
                            {statusMessage && <p className="mt-4 text-green-500">{statusMessage}</p>}
                        </div>
                    </div>
                    {/* Supplementary Product Info */}
                    <div className="w-full mx-auto bg-white rounded-lg shadow-md mt-10 p-6">
                        {/** Display the product's summary */}
                        <h2 className="text-xl font-bold mt-4 mb-2 border-b pb-2">Product Summary</h2>
                        <p className="text-gray-700">{supplementaryProductInfo.summary}</p>
                        {/** Display the product's features */}
                        <h2 className="text-xl font-bold mt-4 mb-2 border-b pb-2">Product Features</h2>
                        <ul className="list-disc pl-5 text-gray-700">
                            {supplementaryProductInfo.features.map((feature, index) => (
                                <li key={index} className="mb-1">{feature}</li>
                            ))}
                        </ul>
                        {/** Display the product's specs */}
                        <h2 className="text-xl font-bold mt-4 mb-2 border-b pb-2">Product Specs</h2>
                        <ul className="list-disc pl-5 text-gray-700">
                            {Object.entries(supplementaryProductInfo.specs).map(([key, value], index) => (
                                <li key={index} className="mb-1">{key}: {value}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}





