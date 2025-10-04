import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import authApi from '../../services/authApi.js';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' });
    const { name, email, password, password2 } = formData;
    const { login } = useAuth();
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            return alert('Passwords do not match');
        }
        try {
            const userData = { name, email, password };
            const registeredUser = await authApi.register(userData);
            login(registeredUser);
            navigate('/');
        } catch (error) {
            console.error('Failed to register:', error);
            alert('Registration failed. The email may already be in use.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                             <h1 className="card-title text-center mb-4"><i className="bi bi-person-plus me-2"></i> Register</h1>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3"><label htmlFor="name" className="form-label">Name</label><input type="text" className="form-control" name="name" value={name} onChange={onChange} placeholder="Enter your name" required /></div>
                                <div className="mb-3"><label htmlFor="email" className="form-label">Email address</label><input type="email" className="form-control" name="email" value={email} onChange={onChange} placeholder="you@example.com" required /></div>
                                <div className="mb-3"><label htmlFor="password" className="form-label">Password</label><input type="password" className="form-control" name="password" value={password} onChange={onChange} placeholder="Minimum 6 characters" required minLength="6" /></div>
                                <div className="mb-3"><label htmlFor="password2" className="form-label">Confirm Password</label><input type="password" className="form-control" name="password2" value={password2} onChange={onChange} placeholder="Confirm your password" required minLength="6" /></div>
                                <div className="d-grid mt-4"><button type="submit" className="btn btn-primary">Register</button></div>
                            </form>
                             <div className="text-center mt-3">
                                <small>Already have an account? <Link to="/login">Login here</Link></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;