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
                <div>
                    <h1>{product.name}</h1>
                    <img src={product.img_url} alt={product.name} />
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Product Code: {product.item_code}</p>
                    <p>{product.inventory > 0 ? 'In Stock' : 'Out of Stock'}</p>
                </div>
            )}
        </>
    )
}

