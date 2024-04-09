// computers.js: Fetch all products under "Computers" category

'use client'
import React, { useState, useEffect } from 'react';
import ProductCardFull from './product-card-full';
import { getComputers } from '../api/api';

const Computers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getComputers();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <ProductCardFull 
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          onSale={product.onSale}
          discountedPrice={product.discountedPrice}
          productCode={product.productCode}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
};

export default Computers;