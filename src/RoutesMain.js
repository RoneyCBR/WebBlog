import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import MainApp from './layout/MainApp';

const RoutesMain = () => {

  return(
    <Routes> 
      <Route path={"/login"} element={<Login />} />
      <Route path={"/"} element={<Login />} />
      <Route path={"/home"} element={<MainApp><Home /></MainApp>} />
      <Route path={"*"} element={<Navigate to="/login" />} />
    </Routes>
  )
};

export default RoutesMain;