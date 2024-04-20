// computers.js: Fetch all products under "Computers" category

'use client'
import React, { useState, useEffect } from 'react';
import ProductCardFull from './product-card-full';
import { getComputers } from '../api/api';
import Breadcrumbs from './breadcrumbs';

const Computers = () => {
  const [products, setProducts] = useState([]);
  const [computerProductType, setComputerProductType] = useState('');

  // Fetch all products containing the code for desktop, laptop and desktop parts
  useEffect(() => {
    const fetchProducts = async () => {
      // TODO: The function getComputers() gets all computers
      // I need methods to get desktops, laptops, and parts...
      const desktopProducts = await getComputers("COMDES");
      const laptopProducts = await getComputers("COMLAP");
      const partsProducts = await getComputers("COMPAR");

      // Add a computerProductType property to each product
      desktopProducts.forEach(product => product.computerProductType = 'desktops');
      laptopProducts.forEach(product => product.computerProductType = 'laptops');
      partsProducts.forEach(product => product.computerProductType = 'parts');

      // Combine all products
      const allProducts = [...desktopProducts, ...laptopProducts, ...partsProducts];

      setProducts(allProducts);
    };

    fetchProducts();
  }, []);




  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const fetchedProducts = await getComputers();
  //     setProducts(fetchedProducts);
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div>
      <Breadcrumbs category="computers" />
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
          url={`/computers/${product.computerProductType}/${product.id}`}
        />
      ))}
    </div>
  );
};

export default Computers;