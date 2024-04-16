// consoles.js - This component displays all products in the Gaming/Consoles category code
'use client'

import { getProductsContainingCategory } from "../api/api";
import ProductCardFull from "./product-card-full";

const { useEffect, useState } = require("react");

export default function Consoles() {
    
        const [products, setProducts] = useState([]);
    
        useEffect(() => {
            const fetchProducts = async () => {
                const fetchedProducts = await getProductsContainingCategory("GAMCON");
                setProducts(fetchedProducts);
            };
    
            fetchProducts();
        }, []);
    
        return (
            <>
                <div>
                    <h1>Consoles</h1>
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
            </>
        )
    }