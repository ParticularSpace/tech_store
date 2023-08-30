import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/LandingPage';
import Checkout from './pages/CheckOut';
import ProductPage from './pages/ProductPage';
import Admin from './pages/Admin'; // Import the Admin component
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/admin" element={<Admin />} /> 
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
