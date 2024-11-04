import React,{createContext,useContext,useState} from "react";

const SidebarContext=createContext();

export const SidebarContextProvider=({ children })=>{
    const [activeMenu,setActiveMenu]=useState(true);
    const [screenSize,setScreenSize]=useState(undefined);
    return (
        <SidebarContext.Provider value={{ activeMenu, setActiveMenu, screenSize,setScreenSize }}>
          {children}
        </SidebarContext.Provider>
      );
};

export const useSidebarContext=()=>{
    return useContext(SidebarContext);
}
