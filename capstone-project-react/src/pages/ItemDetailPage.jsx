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
        fetchItemDetails();
    }, [itemId]);

    const fetchItemDetails = () => {
        axios.get(`http://127.0.0.1:8000/api/items/${itemId}`)
            .then(response => {
                const itemData = response.data;
                setItem(itemData);
                setTotalPrice(itemData.price);
            })
            .catch(error => {
                console.error('Error fetching item details: ', error);
            });
    };

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
                fetchItemDetails();
            })
            .catch(error => {
                console.error('Error adding item to cart: ', error);
            });
    };

    return (
        <div className="PageDiv">
            <div className="MyTitle">
                <h1 className='my-5'>Item Details</h1>
            </div>
            {item ? (
                <div className="container">
                    <div className="row h-50 mb-5">
                        <div className="col-md-6 col-sm-12 item-image-container">
                            <img src={item.image_path} alt={`image ${item.id}`} />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="item-detail-container">
                                <h2 className="fs-1">{item.name}</h2>
                                <p className="fs-3">{item.description}</p>
                                <p className="fs-3">Price: {item.price / 100} €</p>
                                <p className="fs-3">Available Copies: {item.quantity}</p>
                                {isLoggedIn && (
                                    <CartButtonComponent
                                        item={item}
                                        handleAddToCart={handleAddToCart}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ItemDetailPage;


{/* 
    style={{
        backgroundImage: `url(${item.image_path})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'fit',
        backgroundPosition: 'center'
    }}
    */}