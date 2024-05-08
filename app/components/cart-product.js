// cart-product.js - This component represents a product in the user's cart. The quantity can be increased and decreased.
// The product can also be deleted from the cart.

'use client'
import { useEffect, useState, useContext } from "react"
import { addProductToCart, removeProductFromCart, getCartInfo } from "../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { ctx } from "./providers.js";

export default function CartProduct({ image, name, description, price, discount, quantity, productID }) {
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
        <div className="rounded p-4">
            <div className="flex items-center mb-4">
                <img src={image} alt={name} className="w-32 h-32 object-cover mr-4 rounded-sm" />
                <div>
                    <p className="font-medium text-lg text-slate-500">{name}</p>
                    <p className="font-semibold">
                        {discount > 0 ?
                            <>
                                <span className="text-red-500 line-through mr-2">${Number(price).toFixed(2)}</span>
                                <span className="text-green-500">${(Number(price) - ((discount / 100) * Number(price))).toFixed(2)}</span>
                                <span className=" text-green-600 ml-2">You save ${(Number(price) * (discount / 100)).toFixed(2)}</span>
                            </>
                            :
                            <span className="text-slate-500 text-md">${Number(price).toFixed(2)}</span>
                        }
                    </p>
                    <p className="text-slate-500">Quantity: {qty}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {qty === 1 ?
                    <FontAwesomeIcon icon={faMinusCircle} className="cursor-pointer text-gray-500 fa-2x" />
                    :
                    <FontAwesomeIcon icon={faMinusCircle} onClick={decreaseQty} className="cursor-pointer text-blue-500 hover:text-blue-700 fa-2x" />
                }
                <FontAwesomeIcon icon={faPlusCircle} onClick={increaseQty} className="cursor-pointer text-blue-500 hover:text-blue-700 fa-2x" />
            </div>
        </div>
    );
}