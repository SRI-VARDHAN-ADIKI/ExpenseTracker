import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions/';

// Helper function to create the authorization header with the user's token
const getAuthHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
});

// Fetches all transactions for the logged-in user
const getTransactions = async (token) => {
    const config = getAuthHeaders(token);
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Creates a new transaction for the logged-in user
const createTransaction = async (transactionData, token) => {
    const config = getAuthHeaders(token);
    const response = await axios.post(API_URL, transactionData, config);
    return response.data;
};

// Deletes a specific transaction for the logged-in user
const deleteTransaction = async (transactionId, token) => {
    const config = getAuthHeaders(token);
    const response = await axios.delete(API_URL + transactionId, config);
    return response.data;
};

const transactionApi = {
    getTransactions,
    createTransaction,
    deleteTransaction,
};

export default transactionApi;