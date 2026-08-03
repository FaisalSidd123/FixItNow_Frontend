import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const AdminProtectedRoute = ({ children }) => {

  const { currentUser, isAdmin, loading } = useAuth();


  if (loading) {
    return <p>Loading...</p>;
  }


  if (!currentUser || !isAdmin) {
    return <Navigate to="/admin/login" />;
  }


  return children;

};


export default AdminProtectedRoute;