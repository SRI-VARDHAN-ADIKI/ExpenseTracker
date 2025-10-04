import React, { useMemo } from 'react';
import { useTransactions } from '../../context/TransactionContext.jsx';
import ExpenseChart from './ExpenseChart.jsx'; // This import is now correct for our line chart

const DashboardPage = () => {
    // ... all your existing logic is correct ...
    const { transactions, isLoading } = useTransactions();
    const recentTransactions = transactions.slice(0, 5);

    const { totalIncome, totalExpenses, balance } = useMemo(() => {
        let income = 0, expenses = 0;
        transactions.forEach(t => t.type === 'income' ? income += t.amount : expenses += t.amount);
        return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
    }, [transactions]);

    const formatDate = (date) => new Date(date).toLocaleDateString();

    return (
        <>
            <h1 className="h2 pb-2 mb-3 border-bottom">Dashboard</h1>
            
            <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card text-white bg-success shadow">
                        <div className="card-header">Total Income</div>
                        <div className="card-body"><h4 className="card-title">${totalIncome.toFixed(2)}</h4></div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card text-white bg-danger shadow">
                        <div className="card-header">Total Expenses</div>
                        <div className="card-body"><h4 className="card-title">${totalExpenses.toFixed(2)}</h4></div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 mb-4">
                    <div className="card text-dark bg-light shadow">
                        <div className="card-header">Balance</div>
                        <div className="card-body"><h4 className="card-title">${balance.toFixed(2)}</h4></div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-7 mb-4">
                    <h3 className="h4">Monthly Trend</h3>
                    {/* This now renders our new line chart */}
                    <ExpenseChart transactions={transactions} />
                </div>
                <div className="col-lg-5">
                    <h3 className="h4">Recent Transactions</h3>
                    {isLoading ? <p>Loading...</p> : (
                        <div className="list-group">
                            {recentTransactions.map((t) => (
                                <div key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">{t.description}</h5>
                                        <small className="text-muted">{t.category} - {formatDate(t.createdAt)}</small>
                                    </div>
                                    <span className={`badge bg-${t.type === 'income' ? 'success' : 'danger'} rounded-pill fs-6`}>
                                        {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardPage;