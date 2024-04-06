'use client'
// store-product.js - This component will be used to display the details of a product. 
// You can use this component to display the details of a product in the store.

// store-product.js
import React from 'react';

const StoreProduct = ({ item_code, category_code, name, price, description, img_filename, discount_type, ...otherProps }) => {
  return (
    <div>
      <h2>{name}</h2>
      <img src={`/images/${img_filename}`} alt={name} />
      <p>Item Code: {item_code}</p>
      <p>Category: {category_code}</p>
      <p>Price: {price}</p>
      <p>Description: {description}</p>
      <p>Discount Type: {discount_type}</p>
      {/* Display other product details as needed */}
    </div>
  );
};

export default StoreProduct;