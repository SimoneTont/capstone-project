import React from "react";
import axios from "../api/axios";
import { Navigate } from "react-router-dom";

const DeleteProfileButton = ({ userId }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/user/delete/${userId}`)
        .then((response) => {
          console.log("User deleted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Failed to delete user. Please try again.");
        });
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete My Account
    </button>
  );
};

export default DeleteProfileButton;
