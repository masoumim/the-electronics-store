// home-electronics.js - Fetch all products under "Home Electronics" category
'use client'
import { useState, useEffect } from "react";
import { getHomeElectronics } from "../api/api"; // Make sure to implement this function in your API module
import StoreProduct from './store-product';

export default function HomeElectronics() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getHomeElectronics(); // replace with your actual API function
            setProducts(data);
        }
        fetchData();
    }, []);

    return (
        <>
        <p>Home Electronics:</p>
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