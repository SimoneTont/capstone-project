import React, { useState, useEffect } from 'react';
import axios from "../api/axios";
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartButtonHomeComponent';

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
            price: price * quantity,
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
        <div className='PageDiv'>
            <h1 className="mb-4">Welcome to the Home Page, {isLoggedIn && user.name ? user.name : 'Guest'}</h1>
            {isAdmin && (
                <p className="text-muted">Logged in as admin</p>
            )}
            <div className="d-flex flex-wrap">
                {items.map(item => (
                    <div className="m-5 MyCard rounded" key={item.id}>
                        <img src={item.image_path} className="card-img-top rounded" alt={"img" + item.id} />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{truncateText(item.description, 30)}</p>
                            <p className="card-text">Quantity: {item.quantity}</p>
                            <p className="card-text">Price: {item.price/100} €</p>
                            {isLoggedIn && (
                                <CartItem
                                    item={item}
                                    handleAddToCart={handleAddToCart}
                                />
                            )}
                            <a href={"/detail/"+item.id} className="btn ms-2 OrangeButton">Details</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
