import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "../api/axios";
import { Navigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function AdminPage() {
    const isAdmin = useSelector(state => state.auth.user ? state.auth.user.isAdmin : false);
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemImage, setItemImage] = useState('');
    const [price, setPrice] = useState('');

    const [showEditModal, setShowEditModal] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [editedItemName, setEditedItemName] = useState('');
    const [editedItemDescription, setEditedItemDescription] = useState('');
    const [editedItemQuantity, setEditedItemQuantity] = useState('');
    const [editedItemImage, setEditedItemImage] = useState('');
    const [editedPrice, setEditedPrice] = useState('');

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

    const handleEdit = (itemId) => {
        const selectedItem = items.find(item => item.id === itemId);
        if (selectedItem) {
            setEditItemId(itemId);
            setEditedItemName(selectedItem.name);
            setEditedItemDescription(selectedItem.description);
            setEditedItemQuantity(selectedItem.quantity);
            setEditedItemImage(selectedItem.image_path);
            setEditedPrice(selectedItem.price / 100);
            setShowEditModal(true);
        }
    };

    const handleDelete = (itemId) => {
        axios.delete(`http://127.0.0.1:8000/api/delete/${itemId}`)
            .then(response => {
                console.log('Item deleted successfully:', response.data);
                fetchItems();
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    const fetchItems = () => {
        axios.get('http://127.0.0.1:8000/api/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    };

    const handleAddItem = (e) => {
        e.preventDefault();

        const newItem = {
            name: itemName,
            description: itemDescription,
            quantity: itemQuantity,
            image_path: itemImage,
            price: parseFloat(price) * 100,
        };

        axios.post('http://127.0.0.1:8000/api/add', newItem)
            .then(response => {
                console.log('Item added successfully:', response.data);
                fetchItems();
                setItemName('');
                setItemDescription('');
                setItemQuantity('');
                setItemImage('');
                setPrice('');
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
    };

    const handleEditConfirm = () => {
        const editedItem = {
            name: editedItemName,
            description: editedItemDescription,
            quantity: editedItemQuantity,
            image_path: editedItemImage,
            price: parseFloat(editedPrice) * 100,
        };

        axios.put(`http://127.0.0.1:8000/api/edit/${editItemId}`, editedItem)
            .then(response => {
                console.log('Item edited successfully:', response.data);
                fetchItems();
                setShowEditModal(false);
            })
            .catch(error => {
                console.error('Error editing item:', error);
            });
    };

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className='PageDiv'>
            <h1>Admin Page</h1>
            <form onSubmit={handleAddItem} className="mb-3">
                <div className="mb-3">
                    <label htmlFor="itemName" className="form-label">Item Name</label>
                    <input type="text" className="form-control" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="itemDescription" className="form-label">Item Description</label>
                    <textarea className="form-control" id="itemDescription" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="itemImage" className="form-label">Item Image Link</label>
                    <input type="text" className="form-control" id="itemImage" value={itemImage} onChange={(e) => setItemImage(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="itemQuantity" className="form-label">Item Quantity</label>
                    <input type="number" className="form-control" id="itemQuantity" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price (in euros)</label>
                    <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" required />
                </div>
                <button type="submit" className="btn btn-primary">Add Item</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price (in euros)</th>
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
                            <td>{(item.price / 100).toFixed(2)}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(item.id)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="editedItemName" className="form-label">Item Name</label>
                        <input type="text" className="form-control" id="editedItemName" value={editedItemName} onChange={(e) => setEditedItemName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editedItemDescription" className="form-label">Item Description</label>
                        <textarea className="form-control" id="editedItemDescription" value={editedItemDescription} onChange={(e) => setEditedItemDescription(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editedItemImage" className="form-label">Item Image Link</label>
                        <input type="text" className="form-control" id="editedItemImage" value={editedItemImage} onChange={(e) => setEditedItemImage(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editedItemQuantity" className="form-label">Item Quantity</label>
                        <input type="number" className="form-control" id="editedItemQuantity" value={editedItemQuantity} onChange={(e) => setEditedItemQuantity(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editedPrice" className="form-label">Price (in euros)</label>
                        <input type="number" className="form-control" id="editedPrice" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} step="0.01" required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleEditConfirm}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminPage;
