// all-products.js - This component simply displays each of the products in the db as a <Product> component.
// Can be used for testing adding / removing items to cart.

'use client'
import { useEffect, useState } from "react"
import { getProducts } from "../api/api";
import Product from "./product";
import { useContext } from "react";
import { ctx } from "./providers";

export default function AllProducts() {
    const [products, setProducts] = useState([]);

    const context = useContext(ctx);                                // The Context object
    let stripe = context[4];                                      // The Stripe Object

    // TEST: Trying to create a product
    useEffect(() => {
        async function fetchData() {
            const product = await stripe.products.create({
                name: 'Basic Dashboard',
                default_price_data: {
                    unit_amount: 1000,
                    currency: 'usd',
                    recurring: {
                        interval: 'month',
                    },
                },
                expand: ['default_price'],
            });
        }
        fetchData();
    }, [])



    // Get the products from the backend
    useEffect(() => {
        async function fetchData() {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        }
        fetchData();
    }, [])





    // useEffect(() => {
    //     async function doStuff() {

    //         await stripeAddProducts();

    //     }
    //     doStuff();
    // }, [])

    return (
        <>
            {products.map((product, index) => { return <Product key={index} productID={product.id} /> })}
        </>
    )
}