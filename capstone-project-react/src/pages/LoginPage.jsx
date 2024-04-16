import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import axios from '../api/axios';
import { Navigate } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/login", {
        email,
        password,
      });
      
      if (response.status === 200) {
        const userData = response.data.user;
        dispatch(loginSuccess({ user: userData }));
        console.log("Login success:", userData);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className='PageDiv'>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>Login</button>
        {isLoading && <p>Loading...</p>}
      </form>
      <p>Don't have an account? <a href="/register">Register now!</a></p>
    </div>
  );
}

export default LoginPage;
