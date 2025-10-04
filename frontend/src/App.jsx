import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardPage from './components/Dashboard/DashboardPage';
import PrivateRoute from './components/Auth/PrivateRoute'; // <-- Import the new component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />


        <Route element={<PrivateRoute />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;