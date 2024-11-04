import React from 'react';
import Navbar from './Navbar'; 
import Sidebar from './Sidebar'; 
import { useSidebarContext } from '../contexts/SidebarContext';

const Layout = ({ children }) => {
    const {activeMenu}=useSidebarContext();
    return (
    <div className='flex relative'>

        {/* Sidebar stays on the left. Hidden on small screens, visible on large */}
        {activeMenu ? (
            <div className="w-72 fixed">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
        
        

        {/* Main content area */}
        <div
            className={
              activeMenu
                ? 'min-h-screen md:ml-72 w-full  '
                : 'w-full min-h-screen flex-2 '
            }
          >
           {/* Navbar stays at the top */}
           <div className="fixed md:static w-full ">
              <Navbar />
           </div>
           <main className="p-8">{children}</main>
        </div>
   </div>
    );
};
  
export default Layout;