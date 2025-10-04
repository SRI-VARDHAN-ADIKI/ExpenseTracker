import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import transactionApi from '../services/transactionApi.js';
import { useAuth } from './AuthContext.jsx';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const getTransactions = useCallback(async () => {
        if (user?.token) {
            try {
                setIsLoading(true);
                setError(null);
                const data = await transactionApi.getTransactions(user.token);
                setTransactions(data);
            } catch (err) {
                setError('Failed to fetch transactions.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setTransactions([]);
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => { getTransactions(); }, [getTransactions]);

    const addTransaction = async (transactionData) => {
        if (!user?.token) return;
        const newTransaction = await transactionApi.createTransaction(transactionData, user.token);
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const deleteTransaction = async (transactionId) => {
        if (!user?.token) return;
        await transactionApi.deleteTransaction(transactionId, user.token);
        setTransactions((prev) => prev.filter((t) => t._id !== transactionId));
    };

    const value = { transactions, isLoading, error, addTransaction, deleteTransaction };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => useContext(TransactionContext);