import React from 'react';
import useAuth from '../customHooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
