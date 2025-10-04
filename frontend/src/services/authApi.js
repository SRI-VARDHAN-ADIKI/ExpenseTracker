import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const getAuthHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
});

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

// --- NEW FUNCTION START ---
// Update user profile
const updateProfile = async (userData, token) => {
    const config = getAuthHeaders(token);
    const response = await axios.put(API_URL + 'profile', userData, config);
    return response.data;
};
// --- NEW FUNCTION END ---

const authApi = {
  register,
  login,
  updateProfile, // <-- Add the new function to the export
};

export default authApi;