import React, { createContext, useState, useContext, useMemo } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const values = useMemo(() => ({
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
  }), [user, setUser, loading, setLoading, error, setError]);

  return (
    <UserContext.Provider value={values}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

