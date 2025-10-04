import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

// We will create these context files in the next steps, but we import them now.
import { AuthProvider } from './context/AuthContext.jsx';
import { TransactionProvider } from './context/TransactionContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransactionProvider>
          <App />
        </TransactionProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);