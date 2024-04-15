import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import axios from '../api/axios';

function NavBarComponent() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    try {
      axios.get("/sanctum/csrf-cookie");
      const response = axios.post("/logout", {
      });
      if (response.status === 200) {
        console.log("Logout success:", response);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
    dispatch(logout());
  };

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Mu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className={isNavLinkActive('/') ? 'fw-bolder' : ''}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className={isNavLinkActive('/about') ? 'fw-bolder' : ''}>About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className={isNavLinkActive('/contact') ? 'fw-bolder' : ''}>Contact Us</Nav.Link>
            {isLoggedIn && (<Nav.Link as={Link} to="/cart" className={isNavLinkActive('/cart') ? 'fw-bolder' : ''}>Cart</Nav.Link>)}
            {isLoggedIn && (<Nav.Link as={Link} to="/orders" className={isNavLinkActive('/orders') ? 'fw-bolder' : ''}>Your Orders</Nav.Link>)}
            {!isLoggedIn && (<Nav.Link as={Link} to="/login" className={isNavLinkActive('/login') ? 'fw-bolder' : ''}>Login</Nav.Link>)}
            {!isLoggedIn && (<Nav.Link as={Link} to="/register" className={isNavLinkActive('/register') ? 'fw-bolder' : ''}>Register</Nav.Link>)}
          </Nav>
          {isLoggedIn && (
            <Nav.Link as={Link} to="/login"> 
            <Button variant="outline-danger" onClick={handleLogout} >Logout</Button>
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
