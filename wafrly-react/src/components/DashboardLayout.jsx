import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const navigate = useNavigate();

    // Basic protection
    useEffect(() => {
        const token = localStorage.getItem('wafrly_token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="dashboard-main">
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
