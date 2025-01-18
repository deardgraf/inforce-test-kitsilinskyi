import React from 'react';
import "../styles/Modal.css";

const AddProductModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className='modal'>
        <div className='modal-content'>
            <h2>Add Product</h2>

            <p>Name</p>
            <input type="text" />

            <p>Count</p>
            <input type="text" />
            
            <p>Size</p>
            <div className='size'>
                <input type="text" />
                <p>x</p>
                <input type="text" />
            </div>

            <p>Weight</p>
            <input type="text" />
            
            <div className='modal-controls'>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    </div>
  );
};

export default AddProductModal;