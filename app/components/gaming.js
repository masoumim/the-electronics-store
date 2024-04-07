// gaming.js: Fetch all products under "Gaming" category

'use client'
import { useState, useEffect } from "react";
import { getGaming } from "../api/api"; // Make sure to implement this function in your API module
import StoreProduct from './store-product';

export default function Gaming() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getGaming();
            setProducts(data);
        }
        fetchData();
    }, []);

    return (
        <>
        <p>Gaming:</p>
        {products.length > 0 ? 
            products.map((product, index) =>
                <StoreProduct key={index} {...product} />
            )
            :
            <p>No products found!</p>
        }
        </>
    );
}
