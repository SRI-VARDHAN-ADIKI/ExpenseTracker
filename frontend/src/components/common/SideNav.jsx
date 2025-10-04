import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const SideNav = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-dark">
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <i className="bi bi-wallet2 me-3" style={{ fontSize: '2rem' }}></i>
                <span className="fs-4">Expenses</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {isAuthenticated ? (
                    <>
                        <li className="nav-item"><NavLink to="/" className="nav-link text-white" end><i className="bi bi-pie-chart me-2"></i>Dashboard</NavLink></li>
                        <li className="nav-item"><NavLink to="/transactions" className="nav-link text-white"><i className="bi bi-card-list me-2"></i>All Transactions</NavLink></li>
                        <li className="nav-item"><NavLink to="/add-income" className="nav-link text-white"><i className="bi bi-plus-circle me-2"></i>Add Income</NavLink></li>
                        <li className="nav-item"><NavLink to="/add-expense" className="nav-link text-white"><i className="bi bi-dash-circle me-2"></i>Add Expense</NavLink></li>
                    </>
                ) : (
                    <>
                        <li className="nav-item"><NavLink to="/login" className="nav-link text-white"><i className="bi bi-box-arrow-in-right me-2"></i>Login</NavLink></li>
                        <li className="nav-item"><NavLink to="/register" className="nav-link text-white"><i className="bi bi-person-plus me-2"></i>Register</NavLink></li>
                    </>
                )}
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    {/* --- PROFILE PHOTO UPDATE --- */}
                    <img src={isAuthenticated && user.profilePhotoUrl ? user.profilePhotoUrl : `https://placehold.co/32x32/f8f9fa/0d6efd?text=${isAuthenticated && user ? user.name.charAt(0) : 'G'}`} alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{isAuthenticated && user ? user.name : 'Guest'}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    {isAuthenticated && (
                        <>
                            {/* --- NEW LINK HERE --- */}
                            <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={handleLogout}>Sign out</button></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SideNav;