import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import DeveloperInfo from './components/DeveloperInfo';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Auth from './components/Auth';
import Profile from './components/Profile';
import OrderHistory from './components/OrderHistory';
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <div className="page-transition">
                <Hero />
                <ProductList />
                <DeveloperInfo />
              </div>
            } />
            <Route path="/cart" element={<div className="page-transition"><Cart /></div>} />
            <Route path="/product/:id" element={<div className="page-transition"><ProductDetail /></div>} />
            <Route path="/auth" element={<div className="page-transition"><Auth /></div>} />
            <Route path="/profile" element={<div className="page-transition"><Profile /></div>} />
            <Route path="/orders" element={<div className="page-transition"><OrderHistory /></div>} />
            <Route path="/checkout" element={<div className="page-transition"><Checkout /></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;