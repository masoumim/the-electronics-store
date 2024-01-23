// cart-product.js - This component represents a product in the user's cart. The quantity can be increased and decreased.
// The product can also be removed entirely from the cart.

'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import { addProductToCart, removeProductFromCart, getCartInfo, deleteProductFromCart } from "../api/api";
import Link from "next/link";

const auth = getFirebaseAuth();

export default function CartProduct({ name, description, price, discount, quantity, productID }) {
    const [qty, setQty] = useState(quantity);

    // Increase Product Qty
    async function increaseQty() {
        // Add product to cart (backend)
        const res = await addProductToCart(productID);

        // Get the updated quantity value
        const cartInfo = await getCartInfo();
        const updatedProduct = cartInfo.cart_product.find((product) => product.product_id === productID);

        // Set the qty state variable
        setQty(updatedProduct.quantity);
    }

    // Decrease Product Qty
    async function decreaseQty() {
        // Remove product from cart (backend)
        const res = await removeProductFromCart(productID);

        // Get the updated quantity value
        const cartInfo = await getCartInfo();
        const updatedProduct = cartInfo.cart_product.find((product) => product.product_id === productID);

        // Set the qty state variable
        setQty(updatedProduct.quantity);
    }

    return (
        <>
            <p>Name: {name}</p>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
            <p>Discount: {discount}</p>
            <p>Quantity: {qty}</p>
            {qty === 1 ?
                // If qty is 1, render a disabled (grayed-out) button
                <button disabled={true} className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">-</button>
                :
                // If qty is > 1, render a minus button that decreases the quantity of a product in the user's cart
                <button onClick={decreaseQty} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">-</button>
            }            
            <button onClick={increaseQty} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">+</button>
            <br />            
        </>
    )
}