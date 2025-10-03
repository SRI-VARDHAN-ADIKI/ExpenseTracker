import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

const Layout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Column */}
        <div className="col-md-3 col-lg-2 p-0">
          <SideNav />
        </div>

        {/* Main Content Column */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {/* Outlet will render the current page's component (e.g., Login, DashboardPage) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

