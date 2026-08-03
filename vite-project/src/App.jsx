import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
  path="/admin/dashboard"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>
      </Routes>
    </>
  );
}

export default App;