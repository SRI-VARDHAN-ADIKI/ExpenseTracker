import { useState } from 'react'

import Navbar from './components/navbar.jsx'
import ProfilePage from './components/profilepage.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </>
  )
}

export default App
