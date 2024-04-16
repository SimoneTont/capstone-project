import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../api/axios';
import { Navigate } from 'react-router-dom';

function CartPage() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [aggregatedItems, setAggregatedItems] = useState([]);
    const userId = useSelector(state => state.auth.user ? state.auth.user.id : null);

    useEffect(() => {
        if (isLoggedIn && userId) {
            const fetchCartItems = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/cart-items/${userId}`);
                    const cartItems = response.data.cartItems;
                    const aggregated = aggregateItemsByProductName(cartItems);
                    setAggregatedItems(aggregated);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            };

            fetchCartItems();
        }
    }, [isLoggedIn, userId]);

    const aggregateItemsByProductName = (items) => {
        const aggregated = {};
        items.forEach(item => {
            const { id, name, description, image_path, quantity } = item;
            if (aggregated[name]) {
                aggregated[name].quantity += quantity;
            } else {
                aggregated[name] = { id, name, description, image_path, quantity };
            }
        });
        return Object.values(aggregated);
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        } else {
            return text;
        }
    }

    return (
        <div className='PageDiv'>
            <p>Cart</p>
            {aggregatedItems.length === 0 ? (
                <p>No items in the cart.</p>
            ) : (
                aggregatedItems.map(item => (
                    <div className="d-flex" key={item.id}>
                        <div className="card m-2">
                            <img src={item.image_path} className="card-img-top" alt={"img" + item.id} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{truncateText(item.description, 30)}</p>
                                <p className="card-text">Quantity: {item.quantity}</p>
                                <a href={"/detail/" + item.id} className="btn btn-primary">Details</a>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default CartPage;
