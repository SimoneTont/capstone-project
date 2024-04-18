import React, { useState } from 'react';

const CartButtonComponent = ({ item, totalPrice, initialQuantity, handleAddToCart }) => {
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(initialQuantity);

    const openModal = () => {
        setShowModal(true);
        setQuantity(initialQuantity); // Reset quantity to initial value when modal is opened
    };

    const closeModal = () => setShowModal(false);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity);
        }
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

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add {item?.name} to Cart</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to add {item?.name} to your cart?</p>
                                <p>Total Price: {totalPrice} €</p>
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
                                <button type="button" className="btn btn-primary" onClick={() => handleAddToCart(quantity)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartButtonComponent;
