import React from 'react';
import { Outlet } from 'react-router-dom';
import Navber from './Navber';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navber />
      <main className="flex-grow flex justify-center">
        <div className="w-11/12 max-w-7xl px-4 py-8  bg-gray-100">
          <Outlet />
        </div>
      </main>
      <div className='mt-4'>
        <Footer /> 
      </div>
    </div>
  );
};

export default Layout;
