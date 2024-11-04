// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user } = useAuth();

//  if (!user) {
//     return <Navigate to="/login" />; // Redirect to login if not logged in
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     // If the user's role is not allowed, redirect to the access-denied page
//     return <Navigate to="/access-denied" replace />;
//   }


//   return <Outlet />; // Render the child route if authenticated and role is allowed
// };

// export default ProtectedRoute;

// // The user object typically contains information like role and isAuthenticated.