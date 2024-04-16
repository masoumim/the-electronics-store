// home-security.js - This component displays all products in the Home Security category
'use client'

import React, { useState, useEffect } from 'react';
import { getProductsByCategory } from '../api/api';
import ProductCardFull from './product-card-full';

export default function HomeSecurity() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProductsByCategory("HOMSEC");
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {/* Display the Home Security products */}
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
                />
            ))} 
        </div>
    )
}