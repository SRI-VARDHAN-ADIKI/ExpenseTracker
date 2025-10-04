import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CORRECT PATH: ../../ goes up two folders (from Auth -> components -> src) then into 'context'
import { useAuth } from '../../context/AuthContext.jsx';
import authApi from './authApi';

const Login = () => {
  // (The rest of your working Login code is here)
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
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="card-title text-center mb-4">
                <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </h1>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;