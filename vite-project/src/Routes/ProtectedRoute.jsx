import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080b13",
        color: "#ffffff",
        fontFamily: "'Poppins', sans-serif"
      }}>
        <p>Loading session...</p>
      </div>
    );
  }

  if (!userLoggedIn) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
