import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarContextProvider } from './contexts/SidebarContext';
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import SuppliersPage from './pages/SuppliersPage';
import OrdersPage from './pages/OrdersPage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage';
import  NotificationPage from './pages/NotificationPage';
import Layout from './components/Layout';
import AccessDenied from './components/AccessDenied';
// import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
<AuthProvider>
  <SidebarContextProvider>
    <Router>
      <Routes>

      <Route path='/' element={<Navigate to="/register" />} />

      {/* Public Routes */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/access-denied' element={<AccessDenied />} />

      {/* Protected Routes */}
      {/* <Route element={<ProtectedRoute allowedRoles={['Admin', 'Employee', 'Customer','Supplier']} />}> */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/users" element={<Layout><UsersPage /></Layout>} />
        <Route path="/reports" element={<Layout><ReportsPage /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/notifications" element={<Layout><NotificationPage /></Layout>} />
      {/* </Route> */}


      {/* <Route element={<ProtectedRoute allowedRoles={['Admin', 'Employee', 'Customer']} />}> */}
        <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
        <Route path="/orders" element={<Layout><OrdersPage /></Layout>} />
      {/* </Route> */}


      {/* <Route element={<ProtectedRoute allowedRoles={['Admin', 'Employee', 'Supplier']} />}> */}
        <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
        <Route path="/suppliers" element={<Layout><SuppliersPage /></Layout>} />
      {/* </Route> */}

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  </SidebarContextProvider>
</AuthProvider>
  );
};

export default App;
