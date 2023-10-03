import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ProtectedRoute from './ProtectedRoute';
import AllProducts from '../admin/AllProducts';
import AddProducts from '../admin/AddProducts';
import Admin from '../admin/Admin';
import Users from '../admin/Users';
const Routers = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="admin/all-products" element={<AllProducts />} />
        <Route path="admin/add-products" element={<AddProducts />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin" element={<Admin />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};
export default Routers;
