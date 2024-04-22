import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from '../api/axios';

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userId = useSelector(state => state.auth.user ? state.auth.user.id : null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (isLoggedIn && userId) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/orders/${userId}`);
                    setOrders(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [isLoggedIn, userId]);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="PageDiv">
            <div className="MyTitle">
                <h3>Your Orders</h3>
            </div>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                            <th>Date of Purchase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.item.name}</td>
                                <td>{order.quantity}</td>
                                <td>{(order.amount_paid / 100).toFixed(2)} €</td>
                                <td>{new Date(order.created_at).toISOString().split('T')[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OrdersPage;
