import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../../context/TransactionContext.jsx';

const AddIncomePage = () => {
    const { addTransaction } = useTransactions();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
    });

    const { description, amount, category } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const transactionData = {
                description,
                amount: parseFloat(amount),
                category,
                type: 'income', // Type is hardcoded
            };
            await addTransaction(transactionData);
            navigate('/'); // Redirect to the main view after adding
        } catch (err) {
            alert('Failed to add income.');
        }
    };

    return (
        <div className="container pt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="card-title text-center mb-4 text-success">
                                <i className="bi bi-plus-circle me-2"></i> Add Income
                            </h1>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3"><label htmlFor="description" className="form-label">Description</label><input type="text" className="form-control" name="description" value={description} onChange={onChange} placeholder="e.g., Monthly Salary" required /></div>
                                <div className="mb-3"><label htmlFor="amount" className="form-label">Amount</label><input type="number" step="0.01" className="form-control" name="amount" value={amount} onChange={onChange} required /></div>
                                <div className="mb-3"><label htmlFor="category" className="form-label">Category</label><input type="text" className="form-control" name="category" value={category} onChange={onChange} placeholder="e.g., Job, Freelance" required /></div>
                                <div className="d-grid mt-4"><button type="submit" className="btn btn-success">Add Income</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddIncomePage;