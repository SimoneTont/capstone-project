import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../api/axios';
import { Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DeleteButton from '../components/DeleteButtonComponent';
import EditButton from '../components/EditButtonComponent';

function CartPage() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [cartItems, setCartItems] = useState([]);
    const userId = useSelector(state => state.auth.user ? state.auth.user.id : null);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (isLoggedIn && userId) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/cart-items/${userId}`);
                    setCartItems(response.data.cartItems);
                    console.log(response.data.cartItems);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        fetchCartItems();
    }, [isLoggedIn, userId]);

    const handleCheckout = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/cart-items/${userId}/checkout`, {
                userId,
                cartItems
            });
            console.log('Purchase successful:', response.data);

            await axios.delete(`http://127.0.0.1:8000/api/cart-items/${userId}/empty`);
            console.log('Cart items cleared successfully.');

            setCartItems([]);
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    function aggregateItemsByName(items) {
        const aggregated = {};

        items.forEach(item => {
            const { id, name, description, image_path, quantity, price } = item;

            const unitPrice = price / quantity;

            if (aggregated[name]) {
                aggregated[name].quantity += quantity;
                aggregated[name].totalPrice += price;
            } else {
                aggregated[name] = {
                    id,
                    name,
                    description,
                    image_path,
                    quantity,
                    totalPrice: price,
                    unitPrice
                };
            }
        });

        return Object.values(aggregated);
    }

    function calculateTotalOrderPrice(items) {
        let total = 0;
        items.forEach(item => {
            if (item.totalPrice) {
                total += item.totalPrice;
            }
        });
        return total;
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
            <div className="d-flex flex-wrap">
            </div>
            <hr />
            <div>
                <h3>Order Summary</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Total Quantity</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aggregateItemsByName(cartItems).map(item => (
                            <tr key={item.name}>
                                <td><div style={{ backgroundImage: `url(${item.image_path})`, backgroundSize: 'cover', width: '30px', height: '30px' }}></div></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.totalPrice ? `${item.totalPrice / 100} €` : 'N/A'}</td>
                                <td>
                                    <EditButton item={item} />
                                    <DeleteButton item={item} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mb-3 d-flex">
                    {calculateTotalOrderPrice(aggregateItemsByName(cartItems)) > 0 && (
                        <>
                            <p>Total cost: {calculateTotalOrderPrice(aggregateItemsByName(cartItems)) / 100} €</p>
                        </>
                    )}
                    <Button variant="primary" onClick={handleCheckout} className="ms-auto me-2 BlueButton">
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;