import React, { useEffect, useState } from 'react';
import KPICard from '../KPICard'; 
import { getDashboardData } from '../../services/dashboardService'; 
import ProductStockChart from '../ProductStockChart';
import TopSuppliers from '../TopSuppliers';


const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalSuppliers:0,
    lowStockProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
    // topSuppliers: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardData(); // Fetch data from API
        setDashboardData(response); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-12 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard title="Total Products" value={dashboardData.totalProducts} />
        <KPICard title="Total Suppliers" value={dashboardData.totalSuppliers} />
        <KPICard title="Low Stock Products" value={dashboardData.lowStockProducts} />
        <KPICard title="Total Orders" value={6} />
        <KPICard title="Pending Orders" value={2} />
        <KPICard title="Revenue" value={22000} isCurrency />
        {/* <KPICard title="Top Suppliers" value={dashboardData.topSuppliers.join(', ')} /> */}
      </div>

      <div className="max-w-[70rem]">
          <h1 className='lg:text-3xl font-extrabold text-center mb-4 uppercase'>Top 3 Suppliers</h1>
          <TopSuppliers />
      </div>

      <div className="max-w-[70rem]">
          <h1 className='lg:text-3xl font-extrabold text-center mb-4'>Product Stock Levels</h1>
          <ProductStockChart />
      </div>
     
    </div>
  );
};

export default DashboardPage;