import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from '../api/axios';

const EditButton = ({ itemId }) => {
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleEdit = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/cart-items/${itemId}`, { quantity });
            console.log('Cart item updated:', response.data);
            window.location.reload();
            handleClose();
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Cart Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min={1}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditButton;
