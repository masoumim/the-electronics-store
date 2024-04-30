// laptops.js - This component displays all the products in the Laptops category
'use client'

import React, { useState, useEffect } from 'react';
import { getProductsByCategory } from '../api/api';
import ProductCardFull from './product-card-full';

export default function Laptops() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProductsByCategory("COMLAP");
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <div className="flex flex-wrap gap-4">
                {products.map(product => (
                    <ProductCardFull
                        id={product.id}
                        image={product.img_url}
                        name={product.name}
                        price={product.price}
                        onSale={product.discount_type !== 'none'}
                        discountedPrice={product.price * (1 - product.discount_percent / 100)}
                        productCode={product.item_code}
                        inStock={product.inventory > 0}
                        url={`/computers/laptops/${product.id}`}
                    />
                ))}
            </div>
        </div>
    );
}