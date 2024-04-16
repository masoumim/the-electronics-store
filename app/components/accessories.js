// accessories.js - This component displays all products in the Accessories category
'use client'

import React, { useState, useEffect } from 'react';
import { getProductsContainingCategory } from '../api/api';
import ProductCardFull from './product-card-full';

export default function Accessories() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProductsContainingCategory("GAMACC");
            setProducts(fetchedProducts);
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
                />
            ))} 
        </div>
    )
}