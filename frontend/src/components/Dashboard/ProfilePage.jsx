import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import authApi from '../../services/authApi.js';

const ProfilePage = () => {
    const { user, login } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        profilePhotoUrl: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                profilePhotoUrl: user.profilePhotoUrl || '',
            });
        }
    }, [user]);

    const { name, email, profilePhotoUrl } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await authApi.updateProfile(formData, user.token);
            login(updatedUser);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <>
            <h1 className="h2 pb-2 mb-4 border-bottom">My Profile</h1>
            <div className="row justify-content-center">
                <div className="col-lg-10"> 
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <form onSubmit={onSubmit}>

                                <div className="row align-items-center">

                                    <div className="col-md-4 text-center mb-4 mb-md-0">
                                        <img 
                                            src={profilePhotoUrl || `https://placehold.co/150x150/0d6efd/white?text=${name.charAt(0)}`} 
                                            alt="Profile" 
                                            className="rounded-circle" 
                                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                        />
                                    </div>


                                    <div className="col-md-8">
                                        <div className="mb-3"><label htmlFor="name" className="form-label">Name</label><input type="text" className="form-control" name="name" value={name} onChange={onChange} required /></div>
                                        <div className="mb-3"><label htmlFor="email" className="form-label">Email Address</label><input type="email" className="form-control" name="email" value={email} onChange={onChange} required /></div>
                                        <div className="mb-3"><label htmlFor="profilePhotoUrl" className="form-label">Profile Photo URL</label><input type="text" className="form-control" name="profilePhotoUrl" value={profilePhotoUrl} onChange={onChange} placeholder="https://example.com/photo.jpg" /></div>
                                    </div>
                                </div>
                                
                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-primary">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;