import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "../api/axios";
import CartButtonComponent from '../components/CartButtonDetailComponent';

function ItemDetailPage() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userID = useSelector(state => state.auth.user ? state.auth.user.id : null);

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

    const handleAddToCart = (itemId, quantity, price) => {
        if (!item || quantity < 1) {
            console.error('Invalid item or quantity');
            return;
        }

        axios.post(`http://127.0.0.1:8000/api/items/${itemId}/cart`, {
            quantity,
            user_id: userID,
            price
        })
        .then(response => {
            console.log('Item added to cart:', response.data);
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
                        <p className='card-text'>{item.price / 100} €</p>
                        <p>Available Copies: {item.quantity}</p>
                        {isLoggedIn && (
                            <CartButtonComponent
                                item={item}
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
