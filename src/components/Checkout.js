import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0) {
      setMessage('Your cart is empty. Please add items to proceed to checkout.');
      // Optionally redirect to home or product list
      // navigate('/');
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { user } = supabase.auth.getSession();

      if (!user) {
        setMessage('You must be logged in to place an order.');
        setLoading(false);
        return;
      }

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          shipping_address: shippingAddress,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create order items
      const orderItems = cart.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (orderItemsError) {
        throw orderItemsError;
      }

      // Clear cart (this part needs to be implemented in CartContext)
      // useCart().clearCart(); // Assuming a clearCart function exists

      setMessage('Order placed successfully!');
      // Redirect to order confirmation or history page
      navigate('/orders');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      {message && <p className="checkout-message">{message}</p>}

      {cart.length > 0 && (
        <>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="summary-total">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder} className="shipping-form">
            <h3>Shipping Information</h3>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingAddress.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingAddress.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State/Province"
              value={shippingAddress.state}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip/Postal Code"
              value={shippingAddress.zip}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="place-order-button" disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
