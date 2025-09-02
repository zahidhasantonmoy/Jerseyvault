import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useCart } from '../CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const { cart } = useCart();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Jerseyvault</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/jerseys">Jerseys</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/auth">Login/Signup</Link></li>
        </ul>
      </nav>
      <div className="cart">
        <Link to="/cart">
          <FaShoppingCart />
          <span className="cart-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
