import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price_asc', 'price_desc'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      let query = supabase.from('products').select('*');

      // Search
      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      // Sort
      if (sortBy === 'name') {
        query = query.order('name', { ascending: true });
      } else if (sortBy === 'price_asc') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price_desc') {
        query = query.order('price', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [searchTerm, sortBy]);

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Our Products</h2>

      <div className="product-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="name">Sort by Name</option>
          <option value="price_asc">Sort by Price (Low to High)</option>
          <option value="price_desc">Sort by Price (High to Low)</option>
        </select>
      </div>

      {loading && <div className="loading-message">Loading products...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      {!loading && !error && products.length === 0 && (
        <div className="no-products-message">No products found.</div>
      )}

      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
