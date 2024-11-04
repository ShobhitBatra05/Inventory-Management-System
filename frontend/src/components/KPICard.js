import React from 'react';

const KPICard = ({ title, value, isCurrency = false,lowStock }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
      <h2 className="text-gray-600 text-sm font-bold">{title}</h2>
      <p className={`text-2xl font-bold ${isCurrency ? 'text-green-600' : 'text-gray-800'}`}>
        {isCurrency ? `Rs ${value}` : value}
      </p>
    </div>
  );
};

export default KPICard;


  