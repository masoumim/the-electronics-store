// cart-product.js - This component represents a product in the user's cart. The quantity can be increased and decreased.
// The product can also be removed entirely from the cart.

'use client'
import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { getFirebaseAuth } from "../firebase/config";
import { addProductToCart, removeProductFromCart, getCartInfo, deleteProductFromCart } from "../api/api";
import { ctx } from "./providers.js";

const auth = getFirebaseAuth();

export default function CartProduct({ name, description, price, discount, quantity, productID }) {
    const [qty, setQty] = useState(quantity);
    // const [qty, setQty] = useState();

    const contactsCtx = useContext(ctx);                                // The Context object
    const cart = contactsCtx[0];                                        // State object representing user's cart
    const setCart = contactsCtx[1];                                     // Setter to set cart
    const cartProducts = contactsCtx[2];                                // State object representing user's cart products
    const setCartProducts = contactsCtx[3];                             // Setter to set cart products

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

    // TODO: Update the 'Quantity' value of the product
    useEffect(() => {
        async function fetchData() {
            console.log('cart-product.js useEffect() triggered!');

            // Get the updated quantity value
            const cartInfo = await getCartInfo();
            console.log('cartInfo = ');
            console.log(cartInfo);
            
            // TODO: Trying to find out why 'updatedProduct' is undefined on first render but not on second when the data is the same.
            console.log(cartInfo.cart_product);
            const updatedProduct = cartInfo.cart_product.find((product) => product.product_id === productID);
                        
            // First try testing by hardcoding it? I know the position of the product in the cartInfo.cart_product array is [0]
            // So, try setting it to that and see if I can setQty using the quantity that gets returned..
            console.log('updatedProduct = ');                        
            console.log(updatedProduct);            
            
            
            console.log(cartInfo.cart_product);
            setQty(cartInfo.cart_product[0].quantity); // <-- TODO: This works! Next steps are: Loop though cartInfo.cart_product, find matching product using product id and then setQty using cartInfo.cart_product[n].quantity.

            // Set the qty state variable
            // if (updatedProduct) {
            //     console.log('setQty() called!');
            //     console.log(updatedProduct.quantity);
            //     console.log(`Qty before set = ${qty}`);
            //     setQty(updatedProduct.quantity);
            //     console.log(`Qty after set = ${qty}`);
            //     // setCart(cartInfo);
            // }
        }
        fetchData();
    }, [cartProducts])

    return (
        <>
            <p>Name: {name}</p>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
            <p>Discount: {discount}</p>
            {console.log(`returning qty = ${qty}`)}
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