// all-products.js - This component simply displays each of the products in the db as a <Product> component.
// Can be used for testing adding / removing items to cart.

'use client'
import { useEffect, useState } from "react"
import { getProducts } from "../api/api";
import Product from "./product";

export default function AllProducts() {
    const [products, setProducts] = useState([]);

    // Get the products from the backend
    useEffect(() => {
        async function fetchData() {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        }
        fetchData();
    }, [])

    return (
        <>
            {products.map((product, index) => { return <Product key={index} productID={product.id} /> })}
        </>
    )
}