import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSidebarContext } from '../contexts/SidebarContext';
import { MdOutlineCancel } from 'react-icons/md';
import { MdOutlineInventory } from "react-icons/md";
import {links} from '../data/dummy';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useSidebarContext();
  console.log(activeMenu)

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-gray-800 text-md font-semibold m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-slate-400  m-2';

  return (
    <div className='h-screen bg-gray-800 text-white md:overflow-hidden overflow-auto md:hover:overflow-auto'>

        {activeMenu && (
        <>
          <div className="flex justify-between items-center mt-[1.4rem]">
            <div>
            <Link to="/dashboard" className="items-center ml-3 gap-3 flex text-xl font-bold tracking-tight">
              < MdOutlineInventory/> <span>Inventory Management</span>
            </Link>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </div>
           
          </div>


        <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-white  m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? 'white' : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
        </div>
        
        </>
        )}
    </div>
  );
};

export default Sidebar;
