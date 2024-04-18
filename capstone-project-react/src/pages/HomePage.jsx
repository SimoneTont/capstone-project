import '../css/HomePage.css';
import React, { useState, useEffect } from 'react';
import axios from "../api/axios";
import { useDispatch, useSelector } from 'react-redux';
import CartButtonComponent from '../components/CartButtonComponent';

function HomePage() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const user = useSelector(state => state.auth.user);
    const isAdmin = useSelector(state => state.auth.user ? state.auth.user.isAdmin : false);
    const dispatch = useDispatch();

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    }

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const handleAddToCart = (itemId, quantity, price) => {
        if (!isLoggedIn) {
            console.error('User is not logged in');
            return;
        }

        axios.post(`http://127.0.0.1:8000/api/items/${itemId}/cart`, {
            quantity,
            user_id: user.id,
            price: price * quantity, // Calculate total price based on quantity
        })
        .then(response => {
            console.log('Item added to cart:', response.data);
        })
        .catch(error => {
            console.error('Error adding item to cart: ', error);
        });
    };

    return (
        <div className='PageDiv'>
            <h1 className="mb-4">Welcome to the Home Page, {isLoggedIn && user.name ? user.name : 'Guest'}</h1>
            {isAdmin && (
                <p className="text-muted">Logged in as admin</p>
            )}
            <div className="d-flex flex-wrap">
                {items.map(item => (
                    <div className="m-2" key={item.id}>
                        <img src={item.image_path} className="card-img-top" alt={"img" + item.id} />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{truncateText(item.description, 30)}</p>
                            <p className="card-text">Quantity: {item.quantity}</p>
                            <p className="card-text">Price: {item.price} €</p>
                            {isLoggedIn && (
                                <CartItem
                                    item={item}
                                    handleAddToCart={handleAddToCart}
                                />
                            )}
                            <a href={"/detail/"+item.id} className="btn btn-primary">Details</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Component to handle CartButtonComponent for each item
const CartItem = ({ item, handleAddToCart }) => {
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1); // Initial quantity set to 1

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setQuantity(1); // Reset quantity when modal is closed
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCartClick = () => {
        handleAddToCart(item.id, quantity, item.price); // Pass item price to handleAddToCart
        closeModal(); // Close modal after adding to cart
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

export default HomePage;
