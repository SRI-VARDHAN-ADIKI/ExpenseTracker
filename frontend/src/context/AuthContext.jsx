import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// 2. Create the "Router" component that will broadcast the state
export const AuthProvider = ({ children }) => {
  // We use state to hold the user object. It's null when logged out.
  const [user, setUser] = useState(null);

  // The login function simply takes the user data from the API and saves it
  const login = (userData) => {
    setUser(userData);
  };

  // The logout function clears the user data
  const logout = () => {
    setUser(null);
  };

  // This is the data we broadcast to all other components
  const value = {
    user,
    isAuthenticated: !!user, // A simple boolean: true if user is not null, false otherwise
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a simple "connect to Wi-Fi" hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};