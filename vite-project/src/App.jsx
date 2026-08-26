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
import ProductsCatalogue from "./pages/Products/ProductsCatalogue";
import ProductDetail from "./pages/Products/ProductDetail";
import Checkout from "./pages/Products/Checkout";
import Cart from "./pages/Products/Cart";

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
          
            <Dashboard />
          </>
        }
      />

<Route
    path="/products"
    element={
        <>
            <Navbar />
            <ProductsCatalogue />
        </>
    }

/>
<Route
    path="/products/:productId"
    element={ <> <Navbar /> <ProductDetail /></>}
/>
<Route
  path="/cart"
  element={
    <>
      <Navbar />
      <Cart />
    </>
  }
/>
<Route
    path="/checkout"
    element={
        <>
            <Navbar />
            <Checkout />
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