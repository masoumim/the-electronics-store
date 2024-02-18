// cart.js - This component represents the user's Cart.

'use client'
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation.js";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from '../firebase/config.js';
import { checkBackendSignIn, getCartInfo, getProduct, deleteProductFromCart } from "../api/api.js";
import CartProduct from "./cart-product.js";
import { ctx } from "./providers.js";
import Link from "next/link.js";

const auth = getFirebaseAuth();

export default function Cart() {
    const contactsCtx = useContext(ctx);                                // The Context object
    const cart = contactsCtx[0];                                        // State object representing user's cart
    const setCart = contactsCtx[1];                                     // Setter to set cart
    const cartProducts = contactsCtx[2];                                // State object representing user's cart
    const setCartProducts = contactsCtx[3];                             // Setter to set cart
    const [cartProductsInfo, setCartProductsInfo] = useState(null);     // Array of cart product(s) info (name, price, description etc)
    const router = useRouter();

    // If a user is signed-in, get cart info. Otherwise, redirect user to /sign-in page
    useEffect(() => {
        async function fetchData() {

            console.log('Use effect 1 called!');

            // Get the current signed-in user            
            const user = auth.currentUser;

            if (user) {

                console.log(`Use effect 1 - user = `);
                console.log(user);

                // Confirm user is signed in on the backend                                
                const backendUser = await checkBackendSignIn();

                console.log('checking if user signed in on background =');
                console.log(backendUser);

                if (backendUser) {
                    // Get Cart info
                    const cartInfo = await getCartInfo();
                    setCart(cartInfo);
                    setCartProducts(cartInfo.cart_product);

                    console.log(`auth.currentUser ... cartInfo.cart_product =`);
                    console.log(cartInfo.cart_product);
                }
            } else {

                console.log('Use effect 1 - checking onAuthStateChanged');


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

                            console.log(`onAuthStateChanged ... cartInfo.cart_product =`);
                            console.log(cartInfo.cart_product);
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
            console.log('useEffect 2 called!');
            console.log(`use Effect 2 - cartProducts =`);
            console.log(cartProducts);
            if (cartProducts && cartProducts.length > 0) {
                console.log(`cartProducts = `);
                console.log(cartProducts);
                console.log(`cartProducts.length = ${cartProducts.length} `);

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



                    // Trying this...
                    console.log('setting cartProductsInfo to: ');
                    console.log(fetchedProductsInfo)
                    setCartProductsInfo(fetchedProductsInfo);
                }
                // Set the 'Cart Products Info' array                
                // console.log('!!! setCartProductsInfo(fetchedProductsInfo) --> fetchedProductsInfo = ');
                // console.log(fetchedProductsInfo);
                // setCartProductsInfo(fetchedProductsInfo);
            } else {
                // cartProducts should be an empty array ... lets see
                console.log('cartProducts should be an empty array ... lets see');
                console.log(`cartProducts = `);
                console.log(cartProducts);
                // Set the cart products info
                setCartProductsInfo(null);
            }
        }
        fetchData();
    }, [cartProducts])

    // Delete Product from Cart
    async function deleteProduct(productID) {
        await deleteProductFromCart(productID);

        // Get and set updated cart info
        const cartInfo = await getCartInfo();
        setCart(cartInfo);
        setCartProducts(cartInfo.cart_product);

        console.log(`deleteProduct() called!`);
        console.log('deleteProduct() ... cartInfo = ');
        console.log(cartInfo);
    }

    return (
        <>
            <p>Cart:</p>
            {cartProductsInfo ?
                <>
                    {/* Iterate over cartProductsInfo[] and display each product's properties */}
                    {cartProductsInfo.map((product, index) =>
                        <div key={index}>
                            <CartProduct key={index} name={product.name} description={product.description} price={product.price} discount={product.discountPercent} quantity={product.quantity} productID={product.productID} />
                            <button onClick={() => deleteProduct(product.productID)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
                        </div>
                    )}
                </>
                :
                <p>No products in Cart!</p>}
            <p>Number of Items: {cart.num_items}</p>
            <p>Subtotal: {cart.subtotal}</p>
            <p>Taxes: {cart.taxes}</p>
            <p>Total: {cart.total}</p>
            {/* TODO: Conditionally render the checkout button if the user has product(s) in cart */}
            {cartProductsInfo ?
                <Link href={"/checkout-shipping"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Proceed to checkout</Link>
                :
                <></>
            }

        </>
    )
}