import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from './CommentList';

const ProductDetails = ({ products, comments }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;

  const productComments = comments.filter((comment) => comment.productId === product.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>Weight: {product.weight}</p>
      <p>Count: {product.count}</p>
      <p>
        Size: {product.size.width}x{product.size.height}
      </p>
      <button onClick={() => navigate(-1)}>Back</button>

      <CommentList comments={productComments} />
    </div>
  );
};

export default ProductDetails;