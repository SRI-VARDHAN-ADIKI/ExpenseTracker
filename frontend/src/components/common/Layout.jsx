import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

const Layout = () => {
  return (

    <div className="container-fluid p-0">
      <div className="row g-0"> 
        

        <div className="col-lg-2 col-md-3">
          <SideNav />
        </div>


        <div className="col-lg-10 col-md-9">
          <main className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Outlet />
          </main>
        </div>

      </div>
    </div>
  );
};

export default Layout;