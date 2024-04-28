// product-page.js - This component will display a single product. It is used to render the product details based on the product ID.
'use client'

import React, { useState, useEffect } from 'react';
import { getProduct } from '../api/api.js';

export default function ProductPage({ id }) {
    const [product, setProduct] = useState(null);
    const [supplementaryProductInfo, setSupplementaryProductInfo] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProduct(id);
            setProduct(fetchedProduct);
        };

        const fetchSupplementaryProductInfo = async () => {
            const response = await fetch('/product_info.json');
            if (!response.ok) {
                console.error(`Failed to fetch supplementary product info: ${response.statusText}`);
                return;
            }
            const products = await response.json();
            const fetchedProductInfo = products.find(product => product.id === Number(id));
            setSupplementaryProductInfo(fetchedProductInfo);
        };

        fetchProduct();
        fetchSupplementaryProductInfo();
    }, [id]);

    return (
        <>
            {product && supplementaryProductInfo && (
                <div>
                    <div className="flex">
                        <img className="w-64 h-64 object-cover mb-4" src={product.img_url} alt={product.name} />
                        <div>
                            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                            <p className="mb-2">{product.description}</p>
                            <p className="font-bold mb-2">Price: ${product.price}</p>
                            <p className="mb-2">Product Code: {product.item_code}</p>
                            <p className={product.inventory > 0 ? 'text-green-500' : 'text-red-500'}>{product.inventory > 0 ? 'In Stock' : 'Out of Stock'}</p>
                        </div>
                    </div>
                    <div>
                        {/* Supplementary Product Info */}
                        <h2 className="text-xl font-bold mt-4 mb-2">Product Summary</h2>
                        <p>{supplementaryProductInfo.summary}</p>

                        <h2 className="text-xl font-bold mt-4 mb-2">Product Features</h2>
                        <ul>
                            {supplementaryProductInfo.features.map((feature, index) => (
                                <li key={index} className="mb-1">{feature}</li>
                            ))}
                        </ul>

                        <h2 className="text-xl font-bold mt-4 mb-2">Product Specs</h2>
                        <ul>
                            {Object.entries(supplementaryProductInfo.specs).map(([key, value], index) => (
                                <li key={index} className="mb-1">{key}: {value}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}





