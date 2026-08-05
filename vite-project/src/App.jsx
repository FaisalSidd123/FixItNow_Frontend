import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar/Navbar';

import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';

import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProtectedRoute from './Routes/AdminProtectedRoute';


function App() {
  return (
    <Routes>

      {/* ================================
          CUSTOMER / PUBLIC PAGES
      ================================= */}

      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
          </>
        }
      />

      <Route
        path="/signin"
        element={
          <>
            <Navbar />
            <SignIn />
          </>
        }
      />

      <Route
        path="/signup"
        element={
          <>
            <Navbar />
            <SignUp />
          </>
        }
      />

      <Route
        path="/dashboard"
        element={
          <>
            <Navbar />
            <Dashboard />
          </>
        }
      />


      {/* ================================
          ADMIN PAGES
      ================================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;