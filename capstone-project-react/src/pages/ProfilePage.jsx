import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import ProfileInfoForm from "../components/ProfileInfoForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import DeleteProfileButton from "../components/DeleteProfileButton";

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

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://127.0.0.1:8000/api/users/${userId}`, {
        username: formData.username,
        email: formData.email,
      })
      .then((response) => {
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/api/users/${userId}`, {
        password: formData.password,
      })
      .then((response) => {
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  const onDeleteSuccess = () => {
    alert("User deleted successfully.");
  };

  if (!isLoggedIn || user.id.toString() !== userId.toString()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="PageDiv">
      <div className="MyTitle">
        <h1>Welcome to your profile page, {user.name || "Guest"}</h1>
      </div>
      <div className="mt-5 ProfileInfo">
        <div className="ProfileInfo">
          <h3>Profile Information:</h3>
          <p>Username: {formData.username}</p>
          <p>Email: {formData.email}</p>
        </div>
        <div className="mt-4">
          <h3>Edit Profile:</h3>
          <ProfileInfoForm
            formData={formData}
            handleChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            handleSubmit={handleProfileSubmit}
          />
        </div>
      </div>
      <div className="mt-4">
        <h3>Change Password:</h3>
        <ChangePasswordForm
          formData={formData}
          handleChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          handleSubmit={handlePasswordSubmit}
        />
      </div>
      <div className="mt-4">
        <h3>Danger Zone:</h3>
        <DeleteProfileButton userId={userId} onDeleteSuccess={onDeleteSuccess} />
      </div>
    </div>
  );
}

export default ProfilePage;
