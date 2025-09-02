import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="product-detail-loading">Loading product...</div>;
  }

  if (error) {
    return <div className="product-detail-error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="product-detail-not-found">Product not found.</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h1 className="product-detail-name">{product.name}</h1>
        <p className="product-detail-price">${product.price}</p>
        <p className="product-detail-description">{product.description}</p>

        {product.sizes && product.sizes.length > 0 && (
          <div className="product-detail-variations">
            <h3>Sizes:</h3>
            <div className="variation-options">
              {product.sizes.map((size) => (
                <span key={size} className="variation-option">{size}</span>
              ))}
            </div>
          </div>
        )}

        {product.colors && product.colors.length > 0 && (
          <div className="product-detail-variations">
            <h3>Colors:</h3>
            <div className="variation-options">
              {product.colors.map((color) => (
                <span key={color} className="variation-option color-option" style={{ backgroundColor: color }}></span>
              ))}
            </div>
          </div>
        )}

        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
