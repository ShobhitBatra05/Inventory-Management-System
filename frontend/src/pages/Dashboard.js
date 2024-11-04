import React from 'react';
// import { useAuth } from '../contexts/AuthContext';
import AdminDashboardContent from '../components/DashboardContent/AdminDashboardContent';
// import EmployeeDashboardContent from '../components/DashboardContent/EmployeeDashboardContent';
// import SupplierDashboardContent from '../components/DashboardContent/SupplierDashboardContent';
// import CustomerDashboardContent from '../components/DashboardContent/CustomerDashboardContent';

const Dashboard = () => {
  // const {user}=useAuth();
  // const renderDashboardContent = () => {
  //   switch (user.role) {
  //     case 'Admin':
  //       return <AdminDashboardContent />;
  //     case 'Employee':
  //       return <EmployeeDashboardContent />;
  //     case 'Supplier':
  //       return <SupplierDashboardContent />;
  //     case 'Customer':
  //       return <CustomerDashboardContent />;
  //     default:
  //       return <p>Unauthorized</p>;
  //   }
  // };

  return (
    <div>
      <AdminDashboardContent />
      {/* {renderDashboardContent()} */}
    </div>
  );
};

export default Dashboard;
