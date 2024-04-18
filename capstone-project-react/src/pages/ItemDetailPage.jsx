import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../api/axios";
import CartButtonComponent from '../components/CartButtonComponent';

function ItemDetailPage() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userID = useSelector(state => state.auth.user ? state.auth.user.id : null);
    const dispatch = useDispatch();

    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/items/${itemId}`)
            .then(response => {
                const itemData = response.data;
                setItem(itemData);
                setTotalPrice(itemData.price);
            })
            .catch(error => {
                console.error('Error fetching item details: ', error);
            });
    }, [itemId]);

    const handleAddToCart = (quantity) => {
        if (!item || quantity < 1) {
            console.error('Invalid item or quantity');
            return;
        }

        axios.post(`http://127.0.0.1:8000/api/items/${itemId}/cart`, {
            quantity,
            user_id: userID,
            price: totalPrice * quantity
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
                        <p>Available Copies: {item.quantity}</p> {/* Display available quantity */}
                        {isLoggedIn && (
                            <CartButtonComponent
                                item={item}
                                totalPrice={totalPrice}
                                initialQuantity={1}
                                handleAddToCart={handleAddToCart}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ItemDetailPage;
