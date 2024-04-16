import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "../api/axios";
import { Navigate } from 'react-router-dom';

function AdminPage() {
    const isAdmin = useSelector(state => state.auth.user ? state.auth.user.isAdmin : false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (isAdmin) {
            axios.get('http://127.0.0.1:8000/api/items')
                .then(response => {
                    setItems(response.data);
                })
                .catch(error => {
                    console.error('Error fetching items:', error);
                });
        }
    }, [isAdmin]);

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    const handleEdit = (itemId) => {
        axios.put(`http://127.0.0.1:8000/api/edit/${itemId}`)
            .then(response => {
                console.log('Item edited successfully:', response.data);
            })
            .catch(error => {
                console.error('Error editing item:', error);
            });
    };

    const handleDelete = (itemId) => {
        axios.delete(`http://127.0.0.1:8000/api/delete/${itemId}`)
            .then(response => {
                console.log('Item deleted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    return (
        <div className='PageDiv'>
            <h1>Admin Page</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(item.id)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPage;
