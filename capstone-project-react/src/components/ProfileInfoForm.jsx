import React from "react";

const ProfileInfoForm = ({ formData, handleChange, handleSubmit }) => (
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
    <button type="submit" className="btn mt-3 mb-4 BlueButton">
      Update Profile
    </button>
  </form>
);

export default ProfileInfoForm;
