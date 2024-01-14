import React, { createContext, useState, useContext, useMemo, useEffect } from "react";
import OffLineComponent from "../components/OffLineComponent/OffLineComponent";

const OffLineContext = createContext();

export const OffLineProvider = ({ children }) => {
  
  const [isOnline, setIsOnline] = useState(true);

  const updateOnlineStatus = () => {
    const online = navigator.onLine;
    setIsOnline(online);
    localStorage.setItem('isOnline', JSON.stringify(online));
  };

  useEffect(() => {
    window.addEventListener('load', () => {
      window.addEventListener('online',  updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    });

    return () => {
      window.removeEventListener('online',  updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('isOnline', JSON.stringify(isOnline));
  }, [isOnline]);

  const values = useMemo(() => ({
    isOnline
  }), [isOnline]);

  return (
    <OffLineContext.Provider value={values}>
      <OffLineComponent isOnline={values?.isOnline} />
      {children}
    </OffLineContext.Provider>
  );
};

export const useOffLineContext = () => useContext(OffLineContext);
