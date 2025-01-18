import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => (
  <div>
    <h1>Product List</h1>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>Weight: {product.weight}</p>
          <p>Count: {product.count}</p>
          <Link to={`/product/${product.id}`}>View Details</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductList;