// hdd.js - This component displays all products in the HDD (Hard Disk Drive) category
'use client'

import React, { useState, useEffect } from 'react';
import { getProductsByCategory } from '../api/api';
import ProductCardFull from './product-card-full';

export default function Hdd() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProductsByCategory("COMDESPARHAR");
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {/* Display the HDD products */}
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