'use client'

import { useState, useEffect } from "react";
import { getProducts } from "../api/api"

export default function BackendFetchTest() {
    const [products, setProducts] = useState([]);

    // Test fetching of /products from API
    useEffect(() => {
        async function fetchData() {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        }
        fetchData();
    }, [])

    return (
        <>            
            <p>Products:</p>
            {products.map((product, index) => {
                return <div key={index}>
                    <span>{product.name}</span>
                    <span> - {product.price}</span>
                </div>
            })}
        </>
    )
}