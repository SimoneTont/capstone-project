import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from '../api/axios';

const EditButton = ({ itemId, unitaryPrice, currentQuantity, fetchCartItems }) => {
    const [showModal, setShowModal] = useState(false);
    const [newQuantity, setNewQuantity] = useState(currentQuantity);

    const handleEdit = async () => {
        try {
            const newPrice = unitaryPrice * newQuantity;
            const quantityDifference = newQuantity - currentQuantity;

            const payload = {
                quantity: newQuantity,
                price: newPrice,
                quantityDifference: quantityDifference
            };

            const response = await axios.put(`http://127.0.0.1:8000/api/cart-items/${itemId}`, payload);
            console.log('Cart item updated:', response.data);
            window.location.reload();
            setShowModal(false);
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleChangeQuantity = (e) => {
        const { value } = e.target;
        setNewQuantity(value);
    };

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
                        <Form.Label>New Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            value={newQuantity}
                            onChange={handleChangeQuantity}
                            min={1}
                            required
                        />
                    </Form.Group>
                    <p>Unitary Price: {unitaryPrice / 100} €</p>
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
