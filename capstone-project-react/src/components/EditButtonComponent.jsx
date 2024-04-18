import React from 'react';
import { Button } from 'react-bootstrap';
import axios from '../api/axios';

const EditButton = ({ itemId }) => {
    const handleEdit = async (itemId) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/cart-items/${itemId}`);
            console.log('Cart item updated:', response.data);
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    return (
        <Button variant="primary" onClick={() => handleEdit(itemId)}>
            Edit
        </Button>
    );
};

export default EditButton;
