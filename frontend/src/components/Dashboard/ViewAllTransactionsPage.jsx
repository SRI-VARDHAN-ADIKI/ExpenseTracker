import React, { useState, useMemo } from 'react';
import { useTransactions } from '../../context/TransactionContext.jsx';

const ViewAllTransactionsPage = () => {
    const { transactions, isLoading, error, deleteTransaction } = useTransactions();
    const [filterCategory, setFilterCategory] = useState('');

    const categories = useMemo(() => {
        return [...new Set(transactions.map(t => t.category))];
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        if (!filterCategory) return transactions;
        return transactions.filter(t => t.category === filterCategory);
    }, [transactions, filterCategory]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            deleteTransaction(id).catch(() => alert('Failed to delete transaction.'));
        }
    };
    
    const formatDate = (date) => new Date(date).toLocaleDateString();

    return (
        <div className="container-fluid pt-4">
            <h1 className="h2 pb-2 mb-3 border-bottom">All Transactions</h1>
            
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="categoryFilter" className="form-label">Filter by Category</label>
                    <select id="categoryFilter" className="form-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    {isLoading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {!isLoading && filteredTransactions.length === 0 && <p>No transactions found for this filter.</p>}
                    <div className="list-group">
                        {filteredTransactions.map((t) => (
                            // --- ALIGNMENT FIX IS HERE ---
                            <div key={t._id} className="list-group-item d-flex justify-content-between align-items-center"> {/* This class vertically centers everything */}
                                <div>
                                    <h5 className="mb-1">{t.description}</h5>
                                    <small className="text-muted">{t.category} - {formatDate(t.createdAt)}</small>
                                </div>
                                {/* This inner flexbox group ensures the badge and button are aligned together */}
                                <div className="d-flex align-items-center">
                                    <span className={`badge bg-${t.type === 'income' ? 'success' : 'danger'} rounded-pill fs-6 me-3`}>
                                        {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                    </span>
                                    <button onClick={() => handleDelete(t._id)} className="btn btn-sm btn-outline-danger"><i className="bi bi-trash"></i></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAllTransactionsPage;