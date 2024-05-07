// home-electronics.js: Fetch all products under "Home Electronics" category

'use client'
import React, { useState, useEffect } from 'react';
import ProductCardFull from './product-card-full';
import { getProductsByCategory } from '../api/api';
import Breadcrumbs from './breadcrumbs';

// Add all home electronics products to the page
const HomeElectronics = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch all products in the home electronics category
      const fetchedTelevisions = await getProductsByCategory("HOMTEL");
      const fetchedSpeakers = await getProductsByCategory("HOMSPE");
      const fetchedHomeSecurity = await getProductsByCategory("HOMSEC");
      const fetchedMediaStreamers = await getProductsByCategory("HOMMED");
      const fetchedAppliances = await getProductsByCategory("HOMAPP");

      // Add a ProductType property to each product
      fetchedTelevisions.forEach(product => product.ProductType = 'televisions');
      fetchedSpeakers.forEach(product => product.ProductType = 'speakers');
      fetchedHomeSecurity.forEach(product => product.ProductType = 'home-security');
      fetchedMediaStreamers.forEach(product => product.ProductType = 'media-streamers');
      fetchedAppliances.forEach(product => product.ProductType = 'appliances');

      // Combine all products
      const fetchedProducts = [...fetchedTelevisions, ...fetchedSpeakers, ...fetchedHomeSecurity, ...fetchedMediaStreamers, ...fetchedAppliances];

      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Breadcrumbs category={"homeElectronics"} />
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map(product => (
          <div key={product.id}>
            <ProductCardFull
              id={product.id}
              image={product.img_url}
              name={product.name}
              price={product.price}
              onSale={product.discount_type !== 'none'}
              discountedPrice={product.price * (1 - product.discount_percent / 100)}
              productCode={product.item_code}
              inStock={product.inventory > 0}
              url={product.ProductType === 'televisions'
                ? `/home-electronics/televisions/${product.id}`
                : product.ProductType === 'speakers'
                  ? `/home-electronics/speakers/${product.id}`
                  : product.ProductType === 'home-security'
                    ? `/home-electronics/home-security/${product.id}`
                    : product.ProductType === 'media-streamers'
                      ? `/home-electronics/media-streamers/${product.id}`
                      : `/home-electronics/appliances/${product.id}`}
            />
          </div>
        ))}
        {/* Add ghost items */}
        {Array(4 - products.length % 4).fill().map((_, index) => (
          <div key={`ghost-${index}`} className="w-72 h-0.5">
            {/* No ProductCardFull component */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeElectronics;