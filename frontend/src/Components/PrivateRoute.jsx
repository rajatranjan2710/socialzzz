import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  return isAuthenticated && user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
