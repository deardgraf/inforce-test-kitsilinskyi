import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddProductModal from './AddProductModal';
import DeletingConfirmation from './DeletingConfirmation';
import "../styles/ProductList.css";

const ProductList = ({ products }) => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false); // Стан відображення модального вікна додавання товару
    const [isDeletingConfirmationOpen, setIsDeletingConfirmationOpen] = useState(false); // Стан відображення модального вікна підтвердження видалення товару
    const [sortConfig, setSortConfig] = useState(null); // Стейт для зберігання конфігурації сортування
    const [productToDeleteId, setProductToDeleteId] = useState(null);

    const handleAddClick = () => { // Виклик модального вікна для додавання товару
        setIsAddProductModalOpen(true);
    };

    const handleCloseAddProductModal = () => { // Обробник на закриття модального вікна
        setIsAddProductModalOpen(false);
    };

    const handleConfirmAdd = async(newProduct) => { // Додавання товару в базу
        const response = await fetch(`http://localhost:5000/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
    
        if (response.ok) {
            alert('Product added');
            setIsAddProductModalOpen(false);
        } else {
            alert('Failed to add product');
        }
    };

    const handleDeleteClick = (id) => {
        setProductToDeleteId(id);
        setIsDeletingConfirmationOpen(true);
    };

    const handleCloseDelete = () => {
        setIsDeletingConfirmationOpen(false);
    };

    const handleConfirmDelete = async(productToDeleteId) => {
        const response = await fetch(`http://localhost:5000/products/${productToDeleteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            alert('Product deleted');
            setIsDeletingConfirmationOpen(false);
        } else {
            console.log('Failed to delete the product');
        }
    };

    const sortedProducts = React.useMemo(() => {  // Функція сортування таблиці
        let sortableProducts = [...products];
        if (sortConfig !== null) {
            sortableProducts.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableProducts;
    }, [products, sortConfig]);

    const requestSort = (key) => {  // Обробник зміни конфігурації сортування
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {       // Зміна напрямку сортування, якщо таблиця вже відсортована по цьому параметру
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className='list'>
            <div className='controls'>
                <h1>Product List</h1>
                <button className='add-button' onClick={handleAddClick}>Add</button>
            </div>
            
            <table className='products-table'>
                <thead>
                    <tr>
                        <th></th>
                        <th onClick={() => requestSort('name')}>Name</th>   {/* Сортування за назвою */}
                        <th onClick={() => requestSort('count')}>Count</th>  {/* Сортування за кількістю */}
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((product) => (
                        <tr key={product.id} className='product'>
                            <td><img src={product.imageUrl} alt={product.name} /></td>
                            <td>{product.name}</td>
                            <td>{product.count}</td>
                            <td><Link to={`/product/${product.id}`}>View Details</Link></td>
                            <td>
                                <button className='delete-button' >X</button>  {/*  onClick={() => handleDeleteClick(product.id)} */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddProductModal 
                isOpen={isAddProductModalOpen} 
                onClose={handleCloseAddProductModal} 
                onConfirm={handleConfirmAdd} 
            />

            <DeletingConfirmation 
                isOpen={isDeletingConfirmationOpen} 
                onClose={handleCloseDelete} 
                onConfirm={handleConfirmDelete(productToDeleteId)} 
            />

        </div>
    );
};

export default ProductList;