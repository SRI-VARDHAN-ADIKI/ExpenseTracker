import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import transactionApi from '../services/transactionApi'; // Our messenger
import { useAuth } from './AuthContext.jsx'; // Our auth brain

// 1. Create the context
const TransactionContext = createContext();

// 2. Create the provider
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the current user from the AuthContext
  const { user } = useAuth();

  // Function to fetch all transactions for the current user
  const getTransactions = useCallback(async () => {
    // Only try to fetch if the user exists and has a token
    if (user?.token) {
      try {
        setIsLoading(true);
        setError(null);
        const data = await transactionApi.getTransactions(user.token);
        setTransactions(data);
      } catch (err) {
        setError('Failed to fetch transactions.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      // If there's no user, clear the transactions and stop loading
      setTransactions([]);
      setIsLoading(false);
    }
  }, [user]); // This function is re-created only when the 'user' object changes

  // This useEffect hook automatically runs 'getTransactions' whenever the user logs in or out
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  // Function to add a new transaction
  const addTransaction = async (transactionData) => {
    if (!user?.token) return; // Safety check
    const newTransaction = await transactionApi.createTransaction(transactionData, user.token);
    // Add the new transaction to the top of our local list
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // Function to delete a transaction
  const deleteTransaction = async (transactionId) => {
    if (!user?.token) return; // Safety check
    await transactionApi.deleteTransaction(transactionId, user.token);
    // Remove the deleted transaction from our local list
    setTransactions((prev) => prev.filter((t) => t._id !== transactionId));
  };

  const value = { transactions, isLoading, error, addTransaction, deleteTransaction };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

// 3. Create the custom hook
export const useTransactions = () => {
  return useContext(TransactionContext);
};