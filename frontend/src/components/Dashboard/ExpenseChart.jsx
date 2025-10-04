import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 1. Register all the necessary components for a Line Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({ transactions }) => {
    // --- Data Processing Logic ---
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    // Get the total number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Create an array of labels for each day of the month (e.g., "1", "2", ... "31")
    const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

    // Create empty arrays to hold the total for each day, all starting at 0
    const dailyIncome = new Array(daysInMonth).fill(0);
    const dailyExpenses = new Array(daysInMonth).fill(0);

    // Filter transactions to only include those from the current month
    transactions
        .filter(t => {
            const tDate = new Date(t.createdAt);
            return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
        })
        // Loop through this month's transactions and add their amounts to the correct day
        .forEach(t => {
            const dayOfMonth = new Date(t.createdAt).getDate() - 1; // get day (1-31) -> (0-30)
            if (t.type === 'income') {
                dailyIncome[dayOfMonth] += t.amount;
            } else {
                dailyExpenses[dayOfMonth] += t.amount;
            }
        });

    // --- Chart Configuration ---
    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: dailyIncome,
                borderColor: 'rgb(75, 192, 192)', // Greenish-blue
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.2
            },
            {
                label: 'Expenses',
                data: dailyExpenses,
                borderColor: 'rgb(255, 99, 132)', // Red
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.2
            },
        ],
    };

    const options = {
        responsive: true, // Makes the chart resize with the screen
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: `This Month's Financial Trend` },
        },
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">
                {/* Use the <Line /> component from the library */}
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default ExpenseChart;