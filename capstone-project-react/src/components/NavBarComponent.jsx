import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import axios from '../api/axios';
import Logo from '../assets/LogoMu.png';

function NavBarComponent() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isAdmin = useSelector(state => state.auth.user ? state.auth.user.isAdmin : false);
  const user = useSelector(state => state.auth.user);
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
    <Navbar className="SfondoArancione bg-dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={Logo} alt="Logo" height="50px" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={` ${isNavLinkActive('/') ? 'fw-bolder' : ''} WhiteText`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={` ${isNavLinkActive('/about') ? 'fw-bolder' : ''} WhiteText`}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={` ${isNavLinkActive('/contact') ? 'fw-bolder' : ''} WhiteText`}
            >
              Contact Us
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link
                as={Link}
                to="/cart"
                className={` ${isNavLinkActive('/cart') ? 'fw-bolder' : ''} WhiteText`}
              >
                Cart
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link
                as={Link}
                to="/orders"
                className={` ${isNavLinkActive('/orders') ? 'fw-bolder' : ''} WhiteText`}
              >
                Your Orders
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link
                as={Link}
                to="/login"
                className={` ${isNavLinkActive('/login') ? 'fw-bolder' : ''} WhiteText`}
              >
                Login
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link
                as={Link}
                to="/register"
                className={` ${isNavLinkActive('/register') ? 'fw-bolder' : ''} WhiteText`}
              >
                Register
              </Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link
                as={Link}
                to="/admin"
                className={` ${isNavLinkActive('/admin') ? 'fw-bolder' : ''} WhiteText`}
              >
                Admin
              </Nav.Link>
            )}
          </Nav>
          {isLoggedIn && (
            <div className="d-flex ms-auto align-items-center">
              <Nav.Link as={Link} to={`/profile/${user.id}`}
                className={`${isNavLinkActive(`/profile/${user.id}`) ? 'fw-bolder' : ''} mx-2 WhiteText`}>
                Your Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-danger" className="mr-2 BrownButton" onClick={handleLogout} >Logout</Button>
              </Nav.Link>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
