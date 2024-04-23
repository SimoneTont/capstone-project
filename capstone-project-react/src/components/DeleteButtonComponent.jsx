import React from 'react';
import { Button } from 'react-bootstrap';
import axios from '../api/axios';

const DeleteButton = ({ itemId, quantity, onItemDeleted }) => {
    const handleDelete = async (itemId, quantity) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/cart-items/${itemId}`, {
                data: { quantity }
            });

            if (onItemDeleted) {
                onItemDeleted();
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    return (
        <Button className='OrangeButton ms-1 me-3' variant="danger" onClick={() => handleDelete(itemId, quantity)}>
            Delete
        </Button>
    );
};

export default DeleteButton;
