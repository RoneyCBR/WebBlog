import React, { createContext, useState, useContext, useMemo, useCallback } from "react";
import { newAuthFetch } from '../api/authentication/authentication';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reconnectUser = useCallback(() => {
    try{
      setLoading(true);
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } 
    }catch (error) {
      setError(error+'');
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  },[setUser,setLoading,setError]);

  const connectUser = useCallback(async(username,password) => {
    try{
      setLoading(true);
      const res = await newAuthFetch({ username, password });
      setUser(res);
      sessionStorage.setItem('user', JSON.stringify(res)); 
    }catch (error) {
      setError(error+'');
      console.error(error);
    } finally {
      setLoading(false);
    }
  },[setUser,setLoading,setError]);


  const values = useMemo(() => ({
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    reconnectUser,
    connectUser
  }), [user, setUser, loading, setLoading, error, setError, reconnectUser,connectUser]);

  return (
    <UserContext.Provider value={values}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

