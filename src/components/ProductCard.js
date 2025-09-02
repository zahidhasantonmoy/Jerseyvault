import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { useCart } from '../CartContext';
import { supabase } from '../supabaseClient';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const checkWishlist = async () => {
      if (session && product) {
        const { data, error } = await supabase
          .from('wishlist')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('product_id', product.id);

        if (error) {
          console.error('Error checking wishlist:', error);
        } else {
          setIsWishlisted(data.length > 0);
        }
      }
    };
    checkWishlist();
  }, [session, product]);

  const handleWishlistToggle = async () => {
    if (!session) {
      alert('Please log in to add items to your wishlist.');
      return;
    }

    if (isWishlisted) {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', session.user.id)
        .eq('product_id', product.id);

      if (error) {
        console.error('Error removing from wishlist:', error);
      } else {
        setIsWishlisted(false);
      }
    } else {
      const { error } = await supabase
        .from('wishlist')
        .insert({ user_id: session.user.id, product_id: product.id });

      if (error) {
        console.error('Error adding to wishlist:', error);
      } else {
        setIsWishlisted(true);
      }
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
      <div className="product-actions">
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
        <button
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={handleWishlistToggle}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
