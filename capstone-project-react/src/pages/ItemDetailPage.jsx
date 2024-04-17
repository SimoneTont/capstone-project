import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../api/axios";
import { Navigate } from 'react-router-dom';

function ItemDetailPage() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userID = useSelector(state => state.auth.user ? state.auth.user.id : null);
    const dispatch = useDispatch();

    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/items/${itemId}`)
            .then(response => {
                const itemData = response.data;
                setItem(itemData);
                setAvailableQuantity(itemData.quantity);
                setPrice(itemData.price);
                setTotalPrice(itemData.price);
            })
            .catch(error => {
                console.error('Error fetching item details: ', error);
            });
    }, [itemId]);

    useEffect(() => {
        if (item) {
            setTotalPrice(item.price * quantity);
        }
    }, [item, quantity]);

    const handleAddToCart = () => {
        if (!item || quantity < 1) {
            console.error('Invalid item or quantity');
            return;
        }

        axios.post(`http://127.0.0.1:8000/api/items/${itemId}/cart`, {
            quantity,
            user_id: userID,
            price: totalPrice
        })
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Error adding item to cart: ', error);
        });
    };

    return (
        <div className="PageDiv">
            <h1>Item Details</h1>
            {item ? (
                <div className="card m-2">
                    <img src={item.image_path} className="card-img-top" alt={`${item.name}_img`} />
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>
                        <p className='card-text'>{item.price} €</p>
                        <p>Available Copies: {availableQuantity}</p>
                        {/* Button triggering modal */}
                        {isLoggedIn && (
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add {item?.name} to Cart</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetailPage;
