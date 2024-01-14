import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';


const RoutesMain = () => {

  return(
    <Routes> 
      <Route  path={"/"} element={<Login />} />
      <Route  path={"/login"} element={<Login />} />
      <Route  path={"*"} element={<Navigate to="/login" />} />
    </Routes>
  )
};

export default RoutesMain;