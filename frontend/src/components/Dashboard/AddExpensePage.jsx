import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../../context/TransactionContext.jsx';

const AddExpensePage = () => {
    const { addTransaction } = useTransactions();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ description: '', amount: '', category: '' });
    const { description, amount, category } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const transactionData = { description, amount: parseFloat(amount), category, type: 'expense' };
            await addTransaction(transactionData);
            navigate('/transactions');
        } catch (err) {
            alert('Failed to add expense.');
        }
    };

    return (
        <>
            <h1 className="h2 pb-2 mb-4 border-bottom">Add Expense</h1>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3"><label htmlFor="description" className="form-label">Description</label><input type="text" className="form-control" name="description" value={description} onChange={onChange} placeholder="e.g., Coffee, Bills" required /></div>
                                <div className="mb-3"><label htmlFor="amount" className="form-label">Amount</label><input type="number" step="0.01" className="form-control" name="amount" value={amount} onChange={onChange} required /></div>
                                <div className="mb-3"><label htmlFor="category" className="form-label">Category</label><input type="text" className="form-control" name="category" value={category} onChange={onChange} placeholder="e.g., Food, Transport" required /></div>
                                <div className="d-grid mt-4"><button type="submit" className="btn btn-danger">Add Expense</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddExpensePage;