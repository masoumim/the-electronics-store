// gaming.js: Fetch all products under "Gaming" category

'use client'
import React, { useState, useEffect } from 'react';
import ProductCardFull from './product-card-full';
import { getProductsByCategory, getProductsContainingCategory } from '../api/api';
import Breadcrumbs from './breadcrumbs';

export default function Gaming() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch all products in the gaming category
      const fetchedConsolesPlaystation = await getProductsContainingCategory("GAMCONPLA");
      const fetchedConsolesXbox = await getProductsContainingCategory("GAMCONXBO");
      const fetchedConsolesNintendo = await getProductsContainingCategory("GAMCONNIN");
      const fetchedAccessoryHeadsets = await getProductsContainingCategory("GAMACCHEA");
      const fetchedAccessoryControllers = await getProductsContainingCategory("GAMACCCON");

      // Add a ProductType property to each product
      fetchedConsolesPlaystation.forEach(product => product.ProductType = 'playstation');
      fetchedConsolesXbox.forEach(product => product.ProductType = 'xbox');
      fetchedConsolesNintendo.forEach(product => product.ProductType = 'nintendo');
      fetchedAccessoryHeadsets.forEach(product => product.ProductType = 'headsets');
      fetchedAccessoryControllers.forEach(product => product.ProductType = 'controllers');

      // Combine all products
      const fetchedProducts = [...fetchedConsolesPlaystation, ...fetchedConsolesXbox, ...fetchedConsolesNintendo, ...fetchedAccessoryHeadsets, ...fetchedAccessoryControllers];

      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Breadcrumbs category="gaming" />
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
          url={product.ProductType === 'playstation' || product.ProductType === 'xbox' || product.ProductType === 'nintendo'
            ? `/gaming/consoles/${product.ProductType}/${product.id}`
            : `/gaming/accessories/${product.ProductType}/${product.id}`}
        />
      ))}
    </div>
  );
};