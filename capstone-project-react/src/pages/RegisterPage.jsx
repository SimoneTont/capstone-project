import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import axios from '../api/axios';
import { Navigate } from 'react-router-dom';

function RegisterPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password_confirmation, setpassword_confirmation] = React.useState('');
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password_confirmation) {
      setPasswordsMatch(false);
      return;
    }

    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      if (response.status === 200) {
        const userData = response.data;
        dispatch(loginSuccess({ user: userData }));
        console.log("Registration success:", response);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className='PageDiv'>
      <form onSubmit={handleSubmit}>
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                placeholder="Name"
                name='name'
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label style={{ marginLeft: '1rem' }}>
              Email:
              <input
                type="text"
                value={email}
                placeholder="Email"
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                placeholder="Password"
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label style={{ marginLeft: '1rem' }}>
              Confirm Password:
              <input
                type="password"
                value={password_confirmation}
                placeholder="Confirm Password"
                name='password_confirmation'
                onChange={(e) => {
                  setpassword_confirmation(e.target.value);
                  setPasswordsMatch(e.target.value === password);
                }}
                required
              />
            </label>
          </div>
        </div>

        {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
        <button type="submit" className='btn mt-2 mb-2 BlueButton'>Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here!</a></p>
    </div>
  );
}

export default RegisterPage;
