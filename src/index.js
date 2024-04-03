import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import FriendsPage from './pages/friends';
import ExpensesPage from './pages/expenses';
import GroupsPage from './pages/groups';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/groups" element={<GroupsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
