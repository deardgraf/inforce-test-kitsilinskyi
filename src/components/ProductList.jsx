import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddProductModal from './AddProductModal';
import "../styles/ProductList.css";

const ProductList = ({ products }) => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

    const handleAddClick = () => {
        setIsAddProductModalOpen(true);
    };

    const handleCloseAddProductModal = () => {
        setIsAddProductModalOpen(false);
    };

    const handleConfirmAdd = async (newProduct) => {
        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
    
        if (response.ok) {
            console.log('Product added');
            setIsAddProductModalOpen(false);
        } else {
            console.error('Failed to add product');
        }
    };

    return (
        <div className='list'>
            <div className='controls'>
                <h1>Product List</h1>
                <button className='addButton' onClick={handleAddClick}>Add</button>
            </div>
            
            <ul>
            {products.map((product) => (
                <li key={product.id} className='product'>
                <img src={product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2>
                <p>Weight: {product.weight}</p>
                <p>Count: {product.count}</p>
                <Link to={`/product/${product.id}`}>View Details</Link>
                </li>
            ))}
            </ul>

            <AddProductModal 
                isOpen={isAddProductModalOpen} 
                onClose={handleCloseAddProductModal} 
                onConfirm={handleConfirmAdd} 
            />

        </div>
    );
};

export default ProductList;