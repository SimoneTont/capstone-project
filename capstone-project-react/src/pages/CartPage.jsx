import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../api/axios';
import { Navigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import DeleteButton from '../components/DeleteButtonComponent';
import EditButton from '../components/EditButtonComponent';

function CartPage() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userId = useSelector(state => state.auth.user ? state.auth.user.id : null);
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        if (isLoggedIn && userId) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/cart-items/${userId}`);
                setCartItems(response.data.cartItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
    };

    useEffect(() => {
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
    const handleItemDeleted = () => {
        fetchCartItems();
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mt-4 PageDiv">
            <div className="MyTitle">
                <h1>Cart Items</h1>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Item Image</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => {
                        const unitaryPrice = item.price / item.quantity;

                        return (
                            <tr key={item.id}>
                                <td className='d-flex justify-content-center'><img className='rounded-2' src={item.image_path} alt={item.name} style={{ width: '100px', height: 'auto' }} /></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price / 100} €</td>
                                <td>
                                    <DeleteButton
                                        itemId={item.id}
                                        quantity={item.quantity}
                                        onItemDeleted={handleItemDeleted}
                                    />
                                    <EditButton
                                        itemId={item.id}
                                        unitaryPrice={unitaryPrice}
                                        currentQuantity={item.quantity}
                                        fetchCartItems={fetchCartItems}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <h4>
                    Total Cost: {' '}
                    {cartItems.reduce((acc, item) => acc + (item.price), 0) / 100} €
                </h4>
                <Button variant="primary" onClick={handleCheckout} className="BlueButton">
                    Checkout
                </Button>
            </div>
        </div>
    );
}

export default CartPage;
