import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DeveloperInfo from './components/DeveloperInfo';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <DeveloperInfo />
      </main>
    </div>
  );
}

export default App;