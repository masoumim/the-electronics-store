// computers.js: Fetch all products under "Computers" category

'use client'
import React, { useState, useEffect } from 'react';
import ProductCardFull from './product-card-full';
import { getProductsByCategory, getProductsContainingCategory } from '../api/api';
import Breadcrumbs from './breadcrumbs';

const Computers = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products containing the code for desktop, laptop and desktop parts
  useEffect(() => {
    const fetchProducts = async () => {

      // Fetch all products in the computers category
      const desktopProducts = await getProductsByCategory("COMDES");
      const laptopProducts = await getProductsByCategory("COMLAP");
      const desktopPartsMemory = await getProductsContainingCategory("COMDESPARMEM");
      const desktopPartsCPU = await getProductsContainingCategory("COMDESPARCPU");
      const desktopPartsHDD = await getProductsContainingCategory("COMDESPARHAR");

      // Add a ProductType property to each product
      desktopProducts.forEach(product => product.ProductType = 'desktops');
      laptopProducts.forEach(product => product.ProductType = 'laptops');
      desktopPartsMemory.forEach(product => product.ProductType = 'memory');
      desktopPartsCPU.forEach(product => product.ProductType = 'cpu');
      desktopPartsHDD.forEach(product => product.ProductType = 'hdd');

      // Combine all products
      const allProducts = [...desktopProducts, ...laptopProducts, ...desktopPartsMemory, ...desktopPartsCPU, ...desktopPartsHDD];

      setProducts(allProducts);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Breadcrumbs category="computers" />
      <div className="flex flex-wrap justify-start space-x-2 space-y-2">
        {products.map(product => (
          <div className="product-card p-5 rounded-md shadow-sm max-w-sm m-2" key={product.id}>
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
              url={product.ProductType === 'desktops' || product.ProductType === 'laptops'
                ? `/computers/${product.ProductType}/${product.id}`
                : `/computers/desktops/parts/${product.ProductType}/${product.id}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Computers;