import axios from 'axios';

// The base URL of our backend API
const API_URL = 'http://localhost:5000/api/auth/';

// Register user function
const register = async (userData) => {
  // Make a POST request to the register endpoint
  const response = await axios.post(API_URL + 'register', userData);
  
  // Axios puts the response data inside the 'data' property
  return response.data;
};

// Login user function
const login = async (userData) => {
  // Make a POST request to the login endpoint
  const response = await axios.post(API_URL + 'login', userData);
  
  return response.data;
};

// Create an object to export
const authApi = {
  register,
  login,
};

export default authApi;