import { useState } from 'react'

import Navbar from './components/navbar.jsx'
import ProfilePage from './components/profilepage.jsx';

import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/homepage.jsx';

function App() {
  const [count, setCount] = useState(0)
  const [expenses, setExpenses] = useState([]);

  function handleAddExpense(expense) {
    setExpenses(prev => [...prev, expense]);
  }

  return (
    <div style={{ display: 'flex' , width: '100vw', height: '100vh' }}>
      <div style={{ minWidth: '200px', background: '#f3f3f3' }}>
        <Navbar />
      </div>
      <div style={{ flex: 1, padding: '32px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
  )
}

export default App
