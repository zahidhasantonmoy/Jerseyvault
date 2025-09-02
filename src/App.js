import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import DeveloperInfo from './components/DeveloperInfo';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <ProductList />
        <DeveloperInfo />
      </main>
    </div>
  );
}

export default App;