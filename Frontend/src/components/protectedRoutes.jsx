import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation(); // Current attempted URL

  if (!token) {
    alert("Login is mandatory to access this page.");
    // Pass the page the user tried to access as a query param
    return <Navigate to={`/auth?redirect=${location.pathname}`} replace />;
  }

  return children;
}
