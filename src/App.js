import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import products from './data/products.json';
import comments from './data/comments.json';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/product/:id" element={<ProductDetails products={products} comments={comments} />} />
      </Routes>
    </Router>
  );
};

export default App;