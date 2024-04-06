// computers.js: Fetch all products under "Computers" category

'use client'
import { useState, useEffect } from "react";
import { getComputers } from "../api/api";
import StoreProduct from './store-product';

export default function Computers() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getComputers();
            setProducts(data);
        }
        fetchData();
    }, []);

    return (
        <>
        <p>Computers:</p>
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