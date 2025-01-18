import React, { useState } from 'react';
import "../styles/Modal.css";

const DeletingConfirmation = ({ isOpen, onClose, onConfirm }) => {
    const [isConfChecked, setIsConfChecked] = useState(false);
    if (!isOpen) return null;

    return (
        <div className='modal'>
            <div className='modal-content'> 
                <input type="checkbox" oonChange={(e) => setIsConfChecked(e.target.checked)}>Are you sure you want to delete?</input>       
                <div className='modal-controls'>
                    <button onClick={onConfirm} disabled={!isConfChecked}>Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeletingConfirmation;