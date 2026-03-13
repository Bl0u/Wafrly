import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('wafrly_token');
        navigate('/');
    };

    const userName = localStorage.getItem('wafrly_user_name') || 'John Doe';

    // Calculate initials (up to 2 characters) from the username
    const initials = userName
        .split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <img src="/Untitled design.png" alt="WAFRLY Icon" className="brand-icon-nav" style={{ height: '42px', width: 'auto', marginRight: '10px' }} />
                    <span className="text-logo" style={{ fontSize: '20px', color: 'var(--text-primary)', fontWeight: '800' }}>WAFRLY</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <h4 className="nav-label">Menu</h4>
                    <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <span className="nav-icon">📊</span>
                        Overview
                    </NavLink>
                    <NavLink to="/dashboard/transactions" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <span className="nav-icon">💸</span>
                        Transactions
                    </NavLink>
                    <NavLink to="/dashboard/analytics" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <span className="nav-icon">📈</span>
                        Analytics
                    </NavLink>
                    <NavLink to="/dashboard/cards" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <span className="nav-icon">💳</span>
                        My Cards
                    </NavLink>
                </div>

                <div className="nav-section">
                    <h4 className="nav-label">Settings</h4>
                    <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <span className="nav-icon">👤</span>
                        Profile
                    </NavLink>
                    <button className="nav-item logout-btn" onClick={handleLogout}>
                        <span className="nav-icon">🚪</span>
                        Log out
                    </button>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile-mini">
                    <div className="avatar">{initials}</div>
                    <div className="user-info">
                        <span className="user-name">{userName}</span>
                        <span className="user-plan">Pro Member</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
