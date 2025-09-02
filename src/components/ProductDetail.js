import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCart } from '../CartContext';
import { FaHeart, FaStar } from 'react-icons/fa'; // Import FaStar
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]); // New state for reviews
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' }); // New state for new review
  const [reviewMessage, setReviewMessage] = useState(''); // New state for review message

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
    const fetchProductAndReviews = async () => {
      try {
        setLoading(true);
        // Fetch product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (productError) {
          throw productError;
        }
        setProduct(productData);

        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select(`*, profiles(username)`)
          .eq('product_id', id)
          .order('created_at', { ascending: false });

        if (reviewsError) {
          throw reviewsError;
        }
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [id]);

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewMessage('');

    if (!session) {
      setReviewMessage('Please log in to submit a review.');
      return;
    }
    if (newReview.rating === 0) {
      setReviewMessage('Please provide a rating.');
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          product_id: product.id,
          user_id: session.user.id,
          rating: newReview.rating,
          comment: newReview.comment,
        });

      if (error) {
        throw error;
      }

      setReviewMessage('Review submitted successfully!');
      setNewReview({ rating: 0, comment: '' });
      // Re-fetch reviews to update the list
      const { data: updatedReviews, error: fetchError } = await supabase
        .from('reviews')
        .select(`*, profiles(username)`)
        .eq('product_id', id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error re-fetching reviews:', fetchError);
      } else {
        setReviews(updatedReviews);
      }
    } catch (err) {
      setReviewMessage(err.message);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  if (loading) {
    return <div className="product-detail-loading">Loading product...</div>;
  }

  if (error) {
    return <div className="product-detail-error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="product-detail-not-found">Product not found.</div>;
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="product-detail-container">
      <div className="product-detail-main-info">
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

          <p className="product-stock">
            Stock: {isOutOfStock ? <span className="out-of-stock">Out of Stock</span> : product.stock}
          </p>

          <div className="product-actions">
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
              onClick={handleWishlistToggle}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>

      <div className="product-reviews-section">
        <h2>Customer Reviews ({reviews.length})</h2>
        <div className="average-rating">
          Average Rating: {averageRating} <FaStar className="star-icon" />
        </div>

        <form onSubmit={handleReviewSubmit} className="review-form">
          <h3>Submit Your Review</h3>
          <div className="rating-input">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={ratingValue}
                  className="star-icon"
                  color={ratingValue <= newReview.rating ? "#ffc107" : "#e4e5e9"}
                  onClick={() => setNewReview({ ...newReview, rating: ratingValue })}
                />
              );
            })}
          </div>
          <textarea
            placeholder="Write your review here..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            rows="4"
          ></textarea>
          <button type="submit" className="submit-review-btn">Submit Review</button>
          {reviewMessage && <p className="review-message">{reviewMessage}</p>}
        </form>

        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <p className="review-author">
                <strong>{review.profiles?.username || 'Anonymous'}</strong> - {new Date(review.created_at).toLocaleDateString()}
              </p>
              <div className="review-rating">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} color={index < review.rating ? "#ffc107" : "#e4e5e9"} />
                ))}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
