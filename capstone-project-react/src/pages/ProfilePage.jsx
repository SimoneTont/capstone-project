import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

function ProfilePage() {
    const user = useSelector(state => state.auth.user);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const { userId } = useParams(); 

    if (!isLoggedIn || user.id.toString() !== userId.toString()) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="PageDiv">
            <h1>Welcome to your profile page, {isLoggedIn && user.name ? user.name : 'Guest'}</h1>
        </div>
    );
}

export default ProfilePage;