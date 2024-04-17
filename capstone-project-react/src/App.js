// Import di React
import React from 'react';
import { Routes, Route, BrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
//Css e Js
import './css/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Pages
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/ItemDetailPage';
import AdminPage from './pages/AdminPage';
// Components
import NavBarComponent from './components/NavBarComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  const location = useLocation();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <>
      <NavBarComponent />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path='/detail/:itemId' element={<DetailPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Container>
      <FooterComponent />
    </>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
