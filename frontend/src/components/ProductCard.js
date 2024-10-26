import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <h3>{product.title}</h3>
      <p>ID: {product.id}</p>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <p className="price">{product.quantity}</p>
    </div>
  );
};

export default ProductCard;
