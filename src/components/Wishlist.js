import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ProductCard from './ProductCard'; // Reusing ProductCard for display
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const fetchWishlist = async () => {
      if (!session) {
        setLoading(false);
        setError('Please log in to view your wishlist.');
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('wishlist')
          .select(`
            product_id,
            products (
              id,
              name,
              price,
              image,
              stock
            )
          `)
          .eq('user_id', session.user.id);

        if (error) {
          throw error;
        }
        setWishlistItems(data.map(item => item.products)); // Extract product details
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [session]);

  if (loading) {
    return <div className="wishlist-loading">Loading wishlist...</div>;
  }

  if (error) {
    return <div className="wishlist-error">Error: {error}</div>;
  }

  if (wishlistItems.length === 0) {
    return <div className="wishlist-empty">Your wishlist is empty.</div>;
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
