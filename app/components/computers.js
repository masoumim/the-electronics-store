// computers.js: Fetch all products under "Computers" category

'use client'
import { useState, useEffect } from "react";
import { getComputers } from "../api/api"; // Get the function to fetch all products under "Computers" category
import ComputerProduct from './computer-product'; // replace with the actual path to your ComputerProduct component

export default function Computers() {
    const [products, setProducts] = useState([]);       // Array of products

    // Fetch the products when the component mounts
    useEffect(() => {
        async function fetchData() {
            const data = await getComputers(); // modify this function to fetch all products under "Computers"
            setProducts(data);
        }
        fetchData();
    }, []);

    return (
        <>
        <p>Computers:</p>
        {products.length > 0 ? 
            products.map((product, index) =>
                <ComputerProduct key={index} {...product} /> // replace with the actual props your ComputerProduct component expects
            )
            :
            <p>No products found!</p>
        }
        </>
    );
}