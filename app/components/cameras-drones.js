// cameras-drones.js: Fetch all products under "Cameras & Drones" category

'use client'
import { useState, useEffect } from "react";
import { getCamerasDrones } from "../api/api"; // Make sure to implement this function in your API module
import StoreProduct from './store-product';

export default function CamerasDrones() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getCamerasDrones();
            setProducts(data);
        }
        fetchData();
    }, []);

    return (
        <>
        <p>Cameras & Drones:</p>
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