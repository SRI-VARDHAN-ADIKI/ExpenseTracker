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
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

   
    const dailyIncome = new Array(daysInMonth).fill(0);
    const dailyExpenses = new Array(daysInMonth).fill(0);


    transactions
        .filter(t => {
            const tDate = new Date(t.createdAt);
            return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
        })
        
        .forEach(t => {
            const dayOfMonth = new Date(t.createdAt).getDate() - 1; 
            if (t.type === 'income') {
                dailyIncome[dayOfMonth] += t.amount;
            } else {
                dailyExpenses[dayOfMonth] += t.amount;
            }
        });


    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: dailyIncome,
                borderColor: 'rgb(75, 192, 192)', 
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.2
            },
            {
                label: 'Expenses',
                data: dailyExpenses,
                borderColor: 'rgb(255, 99, 132)', 
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.2
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: `This Month's Financial Trend` },
        },
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">

                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default ExpenseChart;