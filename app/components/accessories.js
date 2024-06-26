// accessories.js - This component displays all products in the Accessories category
'use client'

import React, { useState, useEffect } from 'react';
import { getProductsContainingCategory } from '../api/api';
import ProductCardFull from './product-card-full';

export default function Accessories() {
    const [products, setProducts] = useState([]);

    // Fetch all gaming accessory products that contain the category code for headsets and controllers
    useEffect(() => {
        const fetchProducts = async () => {
            const headsetProducts = await getProductsContainingCategory("ACCHEA");
            const controllerProducts = await getProductsContainingCategory("ACCCON");

            // Add an accessoryType property to each product
            headsetProducts.forEach(product => product.accessoryType = 'headsets');
            controllerProducts.forEach(product => product.accessoryType = 'controllers');

            // Combine all products
            const allProducts = [...headsetProducts, ...controllerProducts];

            setProducts(allProducts);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <div className="flex flex-wrap gap-4 justify-center">
                {products.map(product => (
                    <div key={product.id}>
                        <ProductCardFull
                            id={product.id}
                            image={product.img_url}
                            name={product.name}
                            price={product.price}
                            onSale={product.discount_type !== 'none'}
                            discountedPrice={product.price * (1 - product.discount_percent / 100)}
                            productCode={product.item_code}
                            inStock={product.inventory > 0}
                            url={`/accessories/${product.accessoryType}/${product.id}`}
                        />
                    </div>
                ))}
                {/* Add ghost items */}
                {Array(4 - products.length % 4).fill().map((_, index) => (
                    <div key={`ghost-${index}`} className="w-72 h-0.5">
                        {/* No ProductCardFull component */}
                    </div>
                ))}
            </div>
        </div>
    );
}