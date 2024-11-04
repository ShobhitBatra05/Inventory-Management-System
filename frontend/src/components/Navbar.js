import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const {user}=useAuth();
  return (
    <nav className="bg-gray-100 p-4 px-8 shadow w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-md font-semibold lg:text-xl">Welcome, {user.name}</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
