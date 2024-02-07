// cart-product.js - This component represents a product in the user's cart. The quantity can be increased and decreased.
// The product can also be deleted from the cart.

'use client'
import { useEffect, useState, useContext } from "react"
import { addProductToCart, removeProductFromCart, getCartInfo } from "../api/api";
import { ctx } from "./providers.js";

export default function CartProduct({ name, description, price, discount, quantity, productID }) {
    const [qty, setQty] = useState(quantity);                           // The quantity of the product
    const contactsCtx = useContext(ctx);                                // The Context object
    const setCart = contactsCtx[1];                                     // Setter to set cart

    // Update the 'Quantity' value of the product
    useEffect(() => {
        async function fetchData() {
            // Get the updated quantity value
            const cartInfo = await getCartInfo();

            let matchingProductQty = null;
            for (let product of cartInfo.cart_product) {
                if (product.product_id === productID) {
                    matchingProductQty = product.quantity;
                    break;
                }
            }
            setQty(matchingProductQty);
        }
        fetchData();
    })

    // Increase Product Qty
    async function increaseQty() {
        // Add product to cart (backend)
        const res = await addProductToCart(productID);

        // Get the updated quantity value
        const cartInfo = await getCartInfo();
        const updatedProduct = cartInfo.cart_product.find((product) => product.product_id === productID);

        // Set the qty state variable
        setQty(updatedProduct.quantity);

        // Update the Cart's info by setting the shared state variable
        setCart(cartInfo);
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

        // Update the Cart's info by setting the shared state variable
        setCart(cartInfo);
    }

    return (
        <>
            <p>Name: {name}</p>
            <p>Description: {description}</p>
            <p>Price: {(price - ((discount / 100) * price)).toFixed(2)}</p>
            <p>Discount: {discount}</p>
            <p>Quantity: {qty}</p>
            {qty === 1 ?
                // If qty is 1, render a disabled (grayed-out) minus button
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