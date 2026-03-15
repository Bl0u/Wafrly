import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Overview.css';

const Overview = () => {
    const navigate = useNavigate();
    const fullName = localStorage.getItem('wafrly_user_name') || 'John Doe';
    const firstName = fullName.split(' ')[0];

    // Read stored dynamic cart orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem(`wafrly_orders_${fullName}`)) || [];

    // Flatten recent items from orders to display individually
    // Sort orders newest first, extract items, attach date, limit to 5
    const recentItems = savedOrders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .flatMap(order =>
            order.items.map(item => ({
                ...item,
                orderDate: order.date
            }))
        )
        .slice(0, 5);

    // Helper to format date relative to today
    const formatOrderDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    // Calculate dynamic stats
    const totalSpent = savedOrders.reduce((sum, order) => sum + order.total, 0);

    // Base assumptions for demonstration purposes
    const baseNetWorth = 16825.40;
    const currentNetWorth = baseNetWorth - totalSpent;
    const monthlyBudget = 5000.00; // EGP Budget limit

    // Calculate progress bar width cleanly (cap at 100%)
    const budgetPercentageRaw = (totalSpent / monthlyBudget) * 100;
    const budgetPercentage = Math.min(budgetPercentageRaw, 100).toFixed(0);

    return (
        <div className="overview-page">
            <header className="overview-header">
                <div>
                    <h1 className="overview-title">Welcome back, {firstName}</h1>
                    <p className="overview-subtitle">Here is what's happening with your money today.</p>
                </div>
                <div className="flex gap-4">
                    <button className="premium-btn" onClick={() => navigate('/dashboard/what-if')}>
                        <span>What If ✨</span>
                    </button>
                    <button className="premium-btn" onClick={() => navigate('/dashboard/generate-report')}>
                        <span>generate report</span>
                    </button>
                </div>
            </header>

            <div className="overview-grid">
                {/* Main Balance Card */}
                <div className="dashboard-card main-balance-card liquid-glass">
                    <div className="card-top">
                        <span className="card-label">Total Net Worth</span>
                        {/* Dynamic trend based on spelling, if spent > 0 we can show an updated trend */}
                        <span className={`trend ${totalSpent > 0 ? 'negative' : 'positive'}`}>
                            {totalSpent > 0 ? `↘ -${(totalSpent / baseNetWorth * 100).toFixed(2)}%` : '↗ 3.28%'}
                        </span>
                    </div>
                    <div className="card-value">EGP {currentNetWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="chart-placeholder">
                        <svg viewBox="0 0 400 100" className="mock-chart">
                            <linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(77, 255, 201, 0.4)" />
                                <stop offset="100%" stopColor="rgba(77, 255, 201, 0)" />
                            </linearGradient>
                            <path d="M0,80 Q50,90 100,60 T200,50 T300,30 T400,10 L400,100 L0,100 Z" fill="url(#gradientLine)" />
                            <path d="M0,80 Q50,90 100,60 T200,50 T300,30 T400,10" fill="none" stroke="#4DFFC9" strokeWidth="3" />
                        </svg>
                    </div>
                </div>

                {/* Spending Card */}
                <div className="dashboard-card spending-card liquid-glass">
                    <div className="card-top">
                        <span className="card-label">This Month's Spending</span>
                    </div>
                    <div className="card-value">EGP {totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="progress-bar-container mt-4">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: `${budgetPercentage}%`,
                                backgroundColor: budgetPercentage > 90 ? '#f87171' : 'var(--accent-blue)'
                            }}
                        ></div>
                    </div>
                    <p className="budget-text">{budgetPercentage}% of your EGP {monthlyBudget.toLocaleString()} budget</p>
                </div>

                {/* Crypto/Investments Card */}
                <div className="dashboard-card investments-card liquid-glass">
                    <div className="card-top">
                        <span className="card-label">Top Performer</span>
                        <div className="icon-badge">BTC</div>
                    </div>
                    <div className="card-value">EGP 64,230.10</div>
                    <span className="trend positive mt-2 block">↗ 8.42% this week</span>
                </div>
            </div>

            <div className="dashboard-card recent-transactions liquid-glass mt-8">
                <div
                    className="card-header pb-4 border-b flex justify-between items-center cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => navigate('/dashboard/recent-transactions')}
                >
                    <h3 className="card-tab-title">Recent Transactions</h3>
                    <span className="text-mint text-sm font-semibold" style={{ color: 'var(--accent-mint)' }}>View Full Log →</span>
                </div>
                <div className="transaction-list mt-4">
                    {recentItems.length === 0 ? (
                        <div className="text-center text-gray-500 py-4 text-sm italic">
                            No recent purchases. Head to Transactions to browse the store!
                        </div>
                    ) : (
                        recentItems.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="tx-item flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="tx-details flex flex-col max-w-[200px]">
                                        <span className="tx-name text-white font-medium truncate" title={item.name}>{item.name}</span>
                                        <span className="tx-date text-xs text-gray-400 mt-1">
                                            {formatOrderDate(item.orderDate)} • Qty: {item.quantity}
                                        </span>
                                    </div>
                                </div>
                                <div className="tx-amount negative text-red-400 font-bold" style={{ color: '#f87171' }}>
                                    -EGP {item.totalPrice.toFixed(2)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Overview;
