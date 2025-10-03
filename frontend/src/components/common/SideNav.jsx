import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const SideNav = () => {
  const isAuthenticated = false; 

  return (
    <div className="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-dark">
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <i className="bi bi-wallet2 me-3" style={{fontSize: '2rem'}}></i>
        <span className="fs-4">Expenses</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {isAuthenticated && (
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white" end>
              <i className="bi bi-grid me-2"></i>
              Dashboard
            </NavLink>
          </li>
        )}

        {!isAuthenticated && (
          <>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link text-white">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link text-white">
                <i className="bi bi-person-plus me-2"></i>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-person-circle fs-4 me-2"></i>
          <strong>
            {isAuthenticated ? 'User Name' : 'Guest'}
          </strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><a className="dropdown-item" href="#">{isAuthenticated ? "Sign out" : "Not logged in"}</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;

