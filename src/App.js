import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import logo from "./logo.png"; 
import "./styles/App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchComments = async () => {
    const response = await fetch('http://localhost:5000/comments');
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchComments();
  }, []);

  return (
    <Router>
      <header className='header'>
        <img src={logo} alt="Logo"/> 
        <p>Kitsilinskyi Dmytro - Inforce Test Task</p>
      </header>
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/product/:id" element={<ProductDetails products={products} comments={comments} />} />
      </Routes>
    </Router>
  );
};

export default App;