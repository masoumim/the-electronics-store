// product-page.js - This component will display a single product. It is used to render the product details based on the product ID.
'use client'

import React, { useState, useEffect } from 'react';
import { getProduct } from '../api/api.js';

export default function ProductPage({ id }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProduct(id);
            setProduct(fetchedProduct);
        };

        fetchProduct();
    }, [id]);

    return (
        <>
            {product && (
                <div className="flex flex-col items-center justify-center p-5">
                    <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                    <img className="w-64 h-64 object-cover mb-4" src={product.img_url} alt={product.name} />
                    <p className="mb-2">{product.description}</p>
                    <p className="font-bold mb-2">Price: ${product.price}</p>
                    <p className="mb-2">Product Code: {product.item_code}</p>
                    <p className={product.inventory > 0 ? 'text-green-500' : 'text-red-500'}>{product.inventory > 0 ? 'In Stock' : 'Out of Stock'}</p>
                </div>
            )}
        </>
    )
}

