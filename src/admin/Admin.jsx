import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import style from '../styles/Admin.module.css';
import Sidebar from './Sidebar';

const Admin = () => {
  return (
    <div className={style.admin}>
      <Sidebar />
      <div className={style.wrapper}>
        <Nav />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
