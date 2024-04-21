// home-electronics.js: Fetch all products under "Home Electronics" category

'use client'
import React, { useState, useEffect } from 'react';
import ProductCardFull from './product-card-full';
import { getHomeElectronics } from '../api/api';

const HomeElectronics = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getHomeElectronics();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
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
  );
};

export default HomeElectronics;