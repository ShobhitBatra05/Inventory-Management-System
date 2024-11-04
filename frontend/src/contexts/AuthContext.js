import React, { createContext, useContext, useState } from 'react';

// Create the Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login =(userData) => {
        // localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
        setUser(userData); // Set user data after login
    };

    const logout = () => {
        // localStorage.removeItem('user'); // Clear user data from localStorage
        setUser(null); // Clear user data on logout
    };
    

    // To persist user data across sessions, you can retrieve it from localStorage when the app initializes
    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser)); // Restore user data
    //     }
    // }, []);


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}    


// Create a custom hook for easy access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};