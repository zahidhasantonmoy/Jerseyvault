import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useCart } from '../CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const Header = () => {
  const { cart } = useCart();
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Jerseyvault</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/jerseys">Jerseys</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li> {/* Contact Link */}
          {session ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/wishlist"><FaHeart /> Wishlist</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <li><Link to="/auth">Login/Signup</Link></li>
          )}
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
