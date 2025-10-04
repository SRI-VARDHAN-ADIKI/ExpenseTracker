import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CORRECT PATH: ../../ goes up two folders (from Auth -> components -> src) then into 'context'
import { useAuth } from '../../context/AuthContext.jsx';
import authApi from './authApi';

const Register = () => {
  // (The rest of your working Register code is here)
   const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' });
  const { name, email, password, password2 } = formData;
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
    } else {
      try {
        const userData = { name, email, password };
        const registeredUser = await authApi.register(userData);
        login(registeredUser);
        navigate('/');
      } catch (error) {
        console.error('Failed to register:', error);
        alert('Registration failed. The email may already be in use.');
      }
    }
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="card-title text-center mb-4">
                <i className="bi bi-person-plus me-2"></i> Register
              </h1>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
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
                    placeholder="Minimum 6 characters"
                    required
                    minLength="6"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password2" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password2"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    placeholder="Confirm your password"
                    required
                    minLength="6"
                  />
                </div>
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary">
                    Register
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

export default Register;