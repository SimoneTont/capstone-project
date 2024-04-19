import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import axios from "../api/axios";

function ProfilePage() {
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const { userId } = useParams();

    const [formData, setFormData] = useState({
        username: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        axios.put(`http://127.0.0.1:8000/api/users/${userId}`, formData)
            .then((response) => {
                console.log('User profile updated:', response.data);
            })
            .catch((error) => {
                console.error('Error updating user profile:', error);
            });
    };

    if (!isLoggedIn || user.id.toString() !== userId.toString()) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="PageDiv">
            <h1>Welcome to your profile page, {user.name || 'Guest'}</h1>
            <div>
                <h2>Profile Information:</h2>
                <p>Username: {formData.username}</p>
                <p>Email: {formData.email}</p>
            </div>
            <div>
                <h2>Edit Profile:</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn mt-3 BlueButton">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default ProfilePage;
