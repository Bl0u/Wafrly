import React, { useState } from 'react';
import './Analytics.css';

const Analytics = () => {
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    // Read user details and calculate basic sample stats based on their dynamic spending
    const fullName = localStorage.getItem('wafrly_user_name') || 'John Doe';
    const savedOrders = JSON.parse(localStorage.getItem(`wafrly_orders_${fullName}`)) || [];

    // Example Calculations
    const totalSpent = savedOrders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = savedOrders.length;
    const averageOrderValue = orderCount > 0 ? (totalSpent / orderCount) : 0;

    const formatOrderDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    if (selectedReceipt) {
        return (
            <div className="analytics-page">
                <header className="page-header">
                    <div className="flex items-center gap-4">
                        <button className="back-arrow-btn" onClick={() => setSelectedReceipt(null)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                        </button>
                        <div>
                            <h1 className="page-title">Receipt Detail</h1>
                            <p className="page-subtitle">ID: {selectedReceipt.orderId}</p>
                        </div>
                    </div>
                </header>

                <div className="dashboard-card liquid-glass mt-6">
                    <div className="card-top border-b pb-4 mb-4">
                        <span className="card-label">Items in this receipt</span>
                    </div>
                    <div className="receipt-items-list">
                        {selectedReceipt.items.map((item, index) => (
                            <div key={index} className="receipt-item flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    {item.imageCover ? (
                                        <img src={item.imageCover} alt={item.name} className="receipt-item-img" />
                                    ) : (
                                        <div className="receipt-item-icon">🛍️</div>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium">{item.name}</span>
                                        <span className="text-gray-400 text-xs text-muted">x{item.quantity} (EGP {item.price.toFixed(2)} ea)</span>
                                    </div>
                                </div>
                                <span className="text-white font-bold">EGP {item.totalPrice.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="receipt-total flex justify-between pt-6 border-t border-white/10 mt-4">
                        <span className="text-gray-400 font-bold uppercase tracking-wider">Total Amount</span>
                        <span className="text-mint font-bold text-xl">EGP {selectedReceipt.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="analytics-page">
            <header className="page-header">
                <div>
                    <h1 className="page-title">Spending Analytics</h1>
                    <p className="page-subtitle">Deep dive into your financial habits and trends.</p>
                </div>
            </header>

            <div className="analytics-grid">
                {/* Stats row */}
                <div className="analytics-stats-row">
                    <div className="dashboard-card liquid-glass stat-card py-6">
                        <span className="card-label">Total Outflow</span>
                        <div className="card-value mt-2 text-3xl">EGP {totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                    <div className="dashboard-card liquid-glass stat-card py-6">
                        <span className="card-label">Orders Placed</span>
                        <div className="card-value mt-2 text-3xl">{orderCount}</div>
                    </div>
                    <div className="dashboard-card liquid-glass stat-card py-6">
                        <span className="card-label">Avg. Value</span>
                        <div className="card-value mt-2 text-3xl">EGP {averageOrderValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                {/* Primary Chart Area */}
                <div className="dashboard-card main-chart-card liquid-glass mt-6">
                    <div className="card-top border-b pb-4">
                        <span className="card-label">Spending Volume (30 Days)</span>
                    </div>
                    <div className="chart-placeholder large-chart mt-6">
                        <svg viewBox="0 0 600 200" className="mock-chart-large w-full h-full">
                            <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(77, 255, 201, 0.4)" />
                                <stop offset="100%" stopColor="rgba(77, 255, 201, 0)" />
                            </linearGradient>
                            {/* Animated line chart drawing over time */}
                            <path className="chart-fill" d="M0,180 Q100,100 200,150 T400,80 T600,40 L600,200 L0,200 Z" fill="url(#analyticsGradient)" />
                            <path className="chart-line" d="M0,180 Q100,100 200,150 T400,80 T600,40" fill="none" stroke="#4DFFC9" strokeWidth="4" />

                            {/* Grid lines */}
                            <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                        </svg>
                    </div>
                </div>

                {/* Categories Breakdown */}
                <div className="dashboard-card category-breakdown-card liquid-glass mt-6">
                    <div className="card-top border-b pb-4">
                        <span className="card-label">Category Allocation</span>
                    </div>
                    <div className="allocation-bars mt-6 flex flex-col gap-6">
                        <div className="allocation-item">
                            <div className="flex justify-between mb-2">
                                <span className="text-white text-sm font-medium">Shopping & Fashion</span>
                                <span className="text-gray-400 text-sm">45%</span>
                            </div>
                            <div className="progress-bar-container h-2 rounded-full overflow-hidden">
                                <div className="progress-bar-fill h-full rounded-full" style={{ width: '45%', backgroundColor: 'var(--accent-mint)' }}></div>
                            </div>
                        </div>
                        <div className="allocation-item">
                            <div className="flex justify-between mb-2">
                                <span className="text-white text-sm font-medium">Electronics</span>
                                <span className="text-gray-400 text-sm">30%</span>
                            </div>
                            <div className="progress-bar-container h-2 rounded-full overflow-hidden">
                                <div className="progress-bar-fill h-full rounded-full" style={{ width: '30%', backgroundColor: 'var(--accent-blue)' }}></div>
                            </div>
                        </div>
                        <div className="allocation-item">
                            <div className="flex justify-between mb-2">
                                <span className="text-white text-sm font-medium">Groceries</span>
                                <span className="text-gray-400 text-sm">25%</span>
                            </div>
                            <div className="progress-bar-container h-2 rounded-full overflow-hidden">
                                <div className="progress-bar-fill h-full rounded-full" style={{ width: '25%', backgroundColor: '#fcd34d' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Receipts Table */}
                <div className="dashboard-card liquid-glass mt-6 col-span-2">
                    <div className="card-top border-b pb-4 mb-4">
                        <span className="card-label">Recent Receipts</span>
                    </div>
                    <div className="receipts-table-container">
                        <table className="receipts-table w-full text-left">
                            <thead>
                                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="pb-4 font-semibold">Date</th>
                                    <th className="pb-4 font-semibold">Order ID</th>
                                    <th className="pb-4 font-semibold">Total</th>
                                    <th className="pb-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-gray-500 italic">No receipts yet. Go shop!</td>
                                    </tr>
                                ) : (
                                    savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((order) => (
                                        <tr key={order.orderId} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="py-4 text-sm text-gray-300">{formatOrderDate(order.date)}</td>
                                            <td className="py-4 text-sm text-gray-400 font-mono">{order.orderId}</td>
                                            <td className="py-4 text-sm font-bold text-white">EGP {order.total.toFixed(2)}</td>
                                            <td className="py-4 text-right">
                                                <button
                                                    className="view-btn text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-mint/20 hover:bg-mint/10 transition-colors"
                                                    onClick={() => setSelectedReceipt(order)}
                                                >
                                                    View Items
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
