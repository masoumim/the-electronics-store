// cameras-drones.js: Fetch all products under "Cameras & Drones" category

'use client'
import React, { useState, useEffect } from 'react';
import ProductCardFull from './product-card-full';
import { getProductsByCategory } from '../api/api';
import Breadcrumbs from './breadcrumbs';

const CamerasDrones = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products in the cameras & drones category
  useEffect(() => {
    const fetchProducts = async () => {
      const droneProcucts = await getProductsByCategory("CAMDRO");
      const memoryProducts = await getProductsByCategory("CAMMEM");
      const actionProducts = await getProductsByCategory("CAMACT");
      const dslrProducts = await getProductsByCategory("CAMDSL");
      const pointAndShootProducts = await getProductsByCategory("CAMPOI");

      // Add a ProductType property to each product
      droneProcucts.forEach(product => product.ProductType = 'drones');
      memoryProducts.forEach(product => product.ProductType = 'memory');
      actionProducts.forEach(product => product.ProductType = 'action');
      dslrProducts.forEach(product => product.ProductType = 'dslr');
      pointAndShootProducts.forEach(product => product.ProductType = 'point-and-shoot');

      // Combine all products
      const allProducts = [...droneProcucts, ...memoryProducts, ...actionProducts, ...dslrProducts, ...pointAndShootProducts];

      setProducts(allProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Breadcrumbs category={"camerasDrones"} />
      <div className="flex flex-wrap gap-4">
        {products.map(product => (
          <ProductCardFull
            id={product.id}
            image={product.img_url}
            name={product.name}
            price={product.price}
            onSale={product.discount_type !== 'none'}
            discountedPrice={product.price * (1 - product.discount_percent / 100)}
            productCode={product.item_code}
            inStock={product.inventory > 0}
            url={`/cameras-drones/${product.ProductType}/${product.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CamerasDrones;