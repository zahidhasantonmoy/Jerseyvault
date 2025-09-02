import React from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart } = useCart();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price}</p>
                  <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary-total">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <Link to="/checkout" className="proceed-to-checkout-btn">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
