// speakers.js - This component displays all of the products in the "speakers" category
'use client'

import React, { useState, useEffect } from 'react';
import { getProductsByCategory } from '../api/api';
import ProductCardFull from './product-card-full';

export default function Speakers() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProductsByCategory("HOMSPE");
            setProducts(fetchedProducts);
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
                            url={`/home-electronics/speakers/${product.id}`}
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
