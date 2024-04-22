import React from "react";

const ChangePasswordForm = ({ formData, handleChange, handleSubmit }) => (
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

export default ChangePasswordForm;
