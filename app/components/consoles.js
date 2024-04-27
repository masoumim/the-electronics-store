// consoles.js - This component displays all products in the Gaming/Consoles category code
'use client'

import { getProductsContainingCategory } from "../api/api";
import ProductCardFull from "./product-card-full";

const { useEffect, useState } = require("react");

export default function Consoles() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            // Fetch all products in the Gaming/Consoles category
            const consolesPlaystation = await getProductsContainingCategory("GAMCONPLA");
            const consolesXbox = await getProductsContainingCategory("GAMCONXBO");
            const consolesNintendo = await getProductsContainingCategory("GAMCONNIN");

            // Add a consoleType property to each product
            consolesPlaystation.forEach(product => product.consoleType = 'playstation');
            consolesXbox.forEach(product => product.consoleType = 'xbox');
            consolesNintendo.forEach(product => product.consoleType = 'nintendo');

            // Combine all products
            const allProducts = [...consolesPlaystation, ...consolesXbox, ...consolesNintendo];

            setProducts(allProducts);
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div className="flex flex-wrap justify-start space-x-2 space-y-2">
                {products.map(product => (
                    <div className="product-card p-5 rounded-md shadow-sm max-w-sm m-2" key={product.id}>
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
                            url={`/gaming/consoles/${product.consoleType}/${product.id}`}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}