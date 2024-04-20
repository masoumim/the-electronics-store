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
            {/* Display the Accessories products */}
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
                    url={`/gaming/accessories/${product.accessoryType}/${product.id}`}
                />
            ))} 
        </div>
    )
}