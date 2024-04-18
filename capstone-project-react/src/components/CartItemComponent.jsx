import React, { useState } from 'react';

const CartItem = ({ item, handleAddToCart }) => {
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setQuantity(1);
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCartClick = () => {
        handleAddToCart(item.id, quantity, item.price);
        closeModal();
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                onClick={openModal}
            >
                Add to Cart
            </button>

            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add {item.name} to Cart</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to add {item.name} to your cart?</p>
                                <p>Total Price: {item.price * quantity} €</p>
                                <div className="mb-3">
                                    <label htmlFor="quantityInput" className="form-label">Quantity:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="quantityInput"
                                        min="1"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddToCartClick}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartItem;