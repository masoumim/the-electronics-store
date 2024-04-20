// parts.js - This component displays all products in the Computers/Desktop/Parts category code
'use client'

import { getProductsContainingCategory } from "../api/api";
import ProductCardFull from "./product-card-full";

const { useEffect, useState } = require("react");

export default function Parts() {

    const [products, setProducts] = useState([]);

    // Fetch all products containing the category code for memory, hdd, and cpu
    useEffect(() => {
        const fetchProducts = async () => {
            const memoryProducts = await getProductsContainingCategory("PARMEM");
            const hddProducts = await getProductsContainingCategory("PARHAR");
            const cpuProducts = await getProductsContainingCategory("PARCPU");

            // Add a partType property to each product
            memoryProducts.forEach(product => product.partType = 'memory');
            hddProducts.forEach(product => product.partType = 'hdd');
            cpuProducts.forEach(product => product.partType = 'cpu');

            // Combine all products
            const allProducts = [...memoryProducts, ...hddProducts, ...cpuProducts];

            setProducts(allProducts);
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div>
                <h1>Parts</h1>
                {products.map(product => (
                    <ProductCardFull
                        key={product.id}
                        id={product.id}
                        image={product.img_url}
                        name={product.name}
                        price={product.price}
                        onSale={product.discount_type !== 'none'}
                        discountedPrice={product.price * (1 - product.discount_percent / 100)}
                        productCode={product.item_code}
                        inStock={product.inventory > 0}
                        url={`/computers/desktops/parts/${product.partType}/${product.id}`}
                    />
                ))}
            </div>
        </>
    )
}