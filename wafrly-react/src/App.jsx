import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/Overview';
import Transactions from './pages/Transactions';
import MyCards from './pages/MyCards';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import RecentTransactions from './pages/RecentTransactions';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Disable browser's default scroll restoration to always start at the Hero
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Also explicitly scroll to top on first mount
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="recent-transactions" element={<RecentTransactions />} />
          <Route path="cards" element={<MyCards />} />
          <Route path="profile" element={<Profile />} />
          {/* Add more nested dashboard routes here later */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
