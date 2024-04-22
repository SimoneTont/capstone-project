import React, { useState } from "react";
import axios from "../api/axios";
import { useSelector } from "react-redux";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const userID = useSelector((state) => (state.auth.user ? state.auth.user.id : null));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const { password } = formData;

    if (!userID) {
      alert("User ID not found. Please login again.");
      return;
    }

    axios
      .put(`/user/profile-password/${userID}`, { password })
      .then((response) => {
        console.log("Password updated successfully:", response.data);
        alert("Password updated successfully!");
        setFormData({ password: "", confirmPassword: "" }); // Clear form fields
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        alert("Failed to update password. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="password">New Password:</label>
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
        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn mt-3 BlueButton">
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
