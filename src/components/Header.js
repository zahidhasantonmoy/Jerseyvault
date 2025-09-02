import React from 'react';
import './Header.css';
import { useCart } from '../CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const { cart } = useCart();

  return (
    <header className="header">
      <div className="logo">
        <a href="/">Jerseyvault</a>
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="/jerseys">Jerseys</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div className="cart">
        <FaShoppingCart />
        <span className="cart-count">{cart.length}</span>
      </div>
    </header>
  );
};

export default Header;
