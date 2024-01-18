// product.js - This component represents a product tile. It is used to populate other pages with products.

'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import { checkBackendSignIn, getUserInfo, signOutBackend, deleteUserBackend, getProduct, addProductToCart } from "../api/api";
import Link from "next/link";

const auth = getFirebaseAuth();

export default function Product({ productID }) {
    const [product, setProduct] = useState({});

    // Get the product info from the backend
    useEffect(() => {
        async function fetchData() {
            console.log('product.js useEffect() called');

            // Get product info
            const fetchedProduct = await getProduct(productID);

            console.log('fetchedProduct = ');
            console.log(fetchedProduct);

            // Call setProduct using the fetchedProduct
            setProduct(fetchedProduct);
        }
        fetchData();
    }, [])

    // Add Product to Cart
    async function addToCart() {
        console.log('calling addProductToCart(productID). productID =');
        console.log(productID);
        // Add product to cart (backend)
        const res = await addProductToCart(productID);
    }

    return (
        <>
            <p>Product:</p>
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Category Code: {product.category_code}</p>
            <p>Item Code: {product.item_code}</p>            
            {auth.currentUser ? <button onClick={addToCart}>Add To Cart</button> : <Link href={"/sign-in"}>Sign-in to add item to cart</Link>}
        </>
    )
}