import React from "react";
import axios from "../api/axios";

const DeleteProfileButton = ({ userId, onDeleteSuccess }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/user/delete/${userId}`)
        .then((response) => {
          console.log("User deleted successfully:", response.data);
          onDeleteSuccess();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          console.log("http://127.0.0.1:8000/api/user/delete/" + userId);
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