import React from "react";
import axios from "../api/axios";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const DeleteProfileButton = ({ userId }) => {
  const [isDeleted, setIsDeleted] = React.useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/user/delete/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            setIsDeleted(true);
            dispatch(logout());
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Failed to delete user. Please try again.");
        });
    }
  };

  if (isDeleted) {
    return <Navigate to="/register" />;
  }

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete My Account
    </button>
  );
};

export default DeleteProfileButton;
