import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const products = [
  {
    id: 1,
    name: 'Cyber-Punk Jersey',
    price: 79.99,
    image: 'https://via.placeholder.com/300x300.png?text=Cyber-Punk+Jersey',
  },
  {
    id: 2,
    name: 'Galaxy Jersey',
    price: 89.99,
    image: 'https://via.placeholder.com/300x300.png?text=Galaxy+Jersey',
  },
  {
    id: 3,
    name: 'Matrix Jersey',
    price: 69.99,
    image: 'https://via.placeholder.com/300x300.png?text=Matrix+Jersey',
  },
];

const ProductList = () => {
  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Our Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
