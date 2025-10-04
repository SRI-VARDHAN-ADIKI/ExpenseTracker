import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';

import DashboardPage from './components/Dashboard/DashboardPage';
import ViewAllTransactionsPage from './components/Dashboard/ViewAllTransactionsPage';
import AddIncomePage from './components/Dashboard/AddIncomePage';
import AddExpensePage from './components/Dashboard/AddExpensePage';
import ProfilePage from './components/Dashboard/ProfilePage'; // <-- Import the new page

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* Private */}
                <Route element={<PrivateRoute />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="transactions" element={<ViewAllTransactionsPage />} />
                    <Route path="add-income" element={<AddIncomePage />} />
                    <Route path="add-expense" element={<AddExpensePage />} />
                    <Route path="profile" element={<ProfilePage />} /> {/* <-- Add the new route */}
                </Route>
            </Route>
        </Routes>
    );
}

export default App;