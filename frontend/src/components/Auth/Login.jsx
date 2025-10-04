import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import authApi from '../../services/authApi.js';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const { login } = useAuth();
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await authApi.login({ email, password });
            login(userData);
            navigate('/');
        } catch (error) {
            console.error('Failed to log in:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="card-title text-center mb-4">
                                <i className="bi bi-box-arrow-in-right me-2"></i> Login
                            </h1>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3"><label htmlFor="email" className="form-label">Email address</label><input type="email" className="form-control" name="email" value={email} onChange={onChange} placeholder="you@example.com" required /></div>
                                <div className="mb-3"><label htmlFor="password" className="form-label">Password</label><input type="password" className="form-control" name="password" value={password} onChange={onChange} placeholder="Enter your password" required /></div>
                                <div className="d-grid mt-4"><button type="submit" className="btn btn-primary">Login</button></div>
                            </form>
                            <div className="text-center mt-3">
                                <small>Don't have an account? <Link to="/register">Register here</Link></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;