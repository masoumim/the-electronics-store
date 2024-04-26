// desktops.js - This components displays all products in the Desktops category code
'use client'

import React, { useState, useEffect } from 'react';
import { getProductsByCategory } from '../api/api';
import ProductCardFull from './product-card-full';

const Desktops = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProductsByCategory("COMDES");
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);


    return (
        <div className="container flex flex-wrap justify-center mx-auto">
            {products.map(product => (
                <div className="product-card p-5 rounded-md shadow-sm max-w-sm mx-auto m-2" key={product.id}>
                    <ProductCardFull
                        id={product.id}
                        image={product.img_url}
                        name={product.name}
                        price={product.price}
                        onSale={product.discount_type !== 'none'}
                        discountedPrice={product.price * (1 - product.discount_percent / 100)}
                        productCode={product.item_code}
                        inStock={product.inventory > 0}
                        url={`/computers/desktops/${product.id}`}
                    />
                </div>
            ))}
        </div>
    );
}

export default Desktops;