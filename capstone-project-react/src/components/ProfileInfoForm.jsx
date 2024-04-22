import React from "react";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName, updateUserEmail } from "../redux/authSlice";

const ProfileInfoForm = ({ formData, handleChange, handleSubmit }) => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => (state.auth.user ? state.auth.user.id : null));

  const submitForm = (e) => {
    e.preventDefault();

    const updatedData = {
      name: formData.username,
      email: formData.email,
    };

    console.log("Data to be sent:", updatedData);

    axios
      .put(`/user/profile/${userID}`, updatedData)
      .then((response) => {
        console.log("User profile updated:", response.data);
        dispatch(updateUserName({ name: updatedData.name }));
        dispatch(updateUserEmail({ email: updatedData.email }));
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  return (
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
      <button type="submit" className="btn mt-3 mb-4 OrangeButton" onClick={submitForm}>
        Update Profile
      </button>
    </form>
  );
};

export default ProfileInfoForm;
