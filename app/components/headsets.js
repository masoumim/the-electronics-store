// headsets.js - This component displays all products in the Headsets category
'use client'

import React, { useState, useEffect } from 'react';
import { getProductsContainingCategory } from '../api/api';
import ProductCardFull from './product-card-full';

export default function Headsets() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProductsContainingCategory("GAMACCHEA");
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <div className="flex flex-wrap justify-start space-x-2 space-y-2">
                {products.map(product => (
                    <div className="product-card p-5 rounded-md shadow-sm max-w-sm m-2" key={product.id}>
                        <ProductCardFull
                            id={product.id}
                            image={product.img_url}
                            name={product.name}
                            price={product.price}
                            onSale={product.discount_type !== 'none'}
                            discountedPrice={product.price * (1 - product.discount_percent / 100)}
                            productCode={product.item_code}
                            inStock={product.inventory > 0}
                            url={`/gaming/accessories/headsets/${product.id}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}