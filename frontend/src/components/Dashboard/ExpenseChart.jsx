import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// We have to register the components we want to use from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ transactions }) => {
    // First, we process the data to be in the format the chart needs
    const expenseByCategory = transactions
        // 1. We only want expenses
        .filter(t => t.type === 'expense')
        // 2. We group them by category and sum the amounts
        .reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
            return acc;
        }, {});

    const chartData = {
        labels: Object.keys(expenseByCategory), // e.g., ['Food', 'Transport', 'Bills']
        datasets: [{
            data: Object.values(expenseByCategory), // e.g., [500, 150, 300]
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        }]
    };

    // If there are no expenses, don't show the chart
    if (chartData.labels.length === 0) {
        return <div className="card p-3 text-center">No expense data to display a chart.</div>;
    }

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title text-center">Expense Breakdown</h5>
                <Pie data={chartData} />
            </div>
        </div>
    );
};

export default ExpenseChart;