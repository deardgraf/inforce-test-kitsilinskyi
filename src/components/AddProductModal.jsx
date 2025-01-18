import React, { useState } from 'react';
import "../styles/Modal.css";

const AddProductModal = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');   // Стейти для полів товару, потрібні для перевірки чи все заповнено, аби не можна було додати порожній товар
  const [count, setCount] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const isFormValid = () => {         // Перевірка, чи всі поля заповнені
    return name && count && width && height && weight;
  };

  const handleConfirm = () => {
    if (isFormValid()) {
        const newProduct = {
          imageUrl: "https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500-300x300.jpg",    // Зображення по дефолту
          name,
          count: parseInt(count, 10),
          size: {
            width: parseInt(width, 10),
            height: parseInt(height, 10),
          },
          weight: parseInt(weight,10)+'g',
        };
        onConfirm(newProduct);
        setName('');
        setCount('');
        setWidth('');
        setHeight('');
        setWeight('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal'>
        <div className='modal-content'>
            <h2>Add Product</h2>

            <p>Name</p>
            <input type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required
            />

            <p>Count</p>
            <input 
                type="number" min="1"
                value={count} 
                onChange={(e) => setCount(e.target.value)} 
                required
            />

            <p>Size</p>
            <div className='size'>
                <input 
                    type="number" min="1"
                    value={width} 
                    onChange={(e) => setWidth(e.target.value)} 
                    required 
                />
                <p>x</p>
                <input 
                    type="number" min="1"
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)} 
                    required 
                />
            </div>

            <p>Weight</p>
            <input 
                type="number" min="1"
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                required 
            />
            
            <div className='modal-controls'>
                <button onClick={handleConfirm} disabled={!isFormValid()}>Confirm</button>    {/* Кнопка неактивна, якщо не всі поля заповнені */}
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    </div>
  );
};

export default AddProductModal;