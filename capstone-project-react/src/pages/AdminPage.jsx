import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "../api/axios";
import { Navigate } from 'react-router-dom';

function AdminPage() {
    const user = useSelector(state => state.auth.user);
    const isAdmin = useSelector(state => state.auth.user ? state.auth.user.isAdmin : false);

    if (!isAdmin) {
        return <Navigate to="/" />;
      }
    return (
        <div className='PageDiv'>
            <h1>Admin Page</h1>
        </div>
    )
}

export default AdminPage;
