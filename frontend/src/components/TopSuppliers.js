import React, { useEffect, useState } from 'react';
import {topSuppliers} from '../services/supplierService'

const TopSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch top 5 suppliers (you'll replace this with your actual API call)
    const fetchSuppliers = async () => {
      const response = await topSuppliers();
      setSuppliers(response);
    };
    
    fetchSuppliers();
  }, []);

  return (
    <div className="w-full h-1/3 bg-white shadow-lg p-4 overflow-y-auto ">
      <div className="grid grid-cols-2 gap-4">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="bg-gray-100 p-4 rounded-lg shadow-sm border-2 border-black">
            <h3 className="text-lg font-semibold">{supplier.name}</h3>
            <h4 className="mt-2 text-md font-semibold">Products Supplied:</h4>
            <ul className="list-disc pl-6 ">
              {supplier.products.map((product) => (
                <li key={product.id} className="text-sm">{product.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSuppliers;