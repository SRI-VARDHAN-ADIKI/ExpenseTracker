import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const PrivateRoute = () => {
  // Connect to the "auth brain" to check the user's status
  const { isAuthenticated } = useAuth();

  // This is the core logic:
  // If the user is authenticated, render the requested page using the <Outlet />.
  // If not, use the <Navigate /> component to force a redirect to the /login page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;