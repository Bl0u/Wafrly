import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecentTransactions.css';

const RecentTransactions = () => {
    const navigate = useNavigate();
    const fullName = localStorage.getItem('wafrly_user_name') || 'John Doe';

    // Read stored dynamic cart orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem(`wafrly_orders_${fullName}`)) || [];

    // Flatten all items from all orders to display individually
    // Sort orders newest first
    const allItems = savedOrders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .flatMap(order =>
            order.items.map(item => ({
                ...item,
                orderDate: order.date
            }))
        );

    // Helper to format date
    const formatOrderDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="recent-transactions-page">
            <header className="page-header">
                <button
                    className="back-button"
                    onClick={() => navigate('/dashboard')}
                >
                    ← Back to Overview
                </button>
                <div style={{ marginTop: '20px' }}>
                    <h1 className="page-title">Transaction History</h1>
                    <p className="page-subtitle">A complete log of all your purchased items.</p>
                </div>
            </header>

            <div className="dashboard-card all-transactions-card liquid-glass">
                <div className="card-top border-b pb-4">
                    <span className="card-label">All Items ({allItems.length})</span>
                </div>

                <div className="transaction-history-list mt-4">
                    {allItems.length === 0 ? (
                        <div className="empty-state">
                            No purchases found. Head to the Store to browse items!
                        </div>
                    ) : (
                        allItems.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="history-item flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-4">
                                    {item.imageCover ? (
                                        <img src={item.imageCover} alt={item.name} className="history-item-image rounded-lg object-cover" />
                                    ) : (
                                        <div className="history-icon" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontSize: '20px' }}>
                                            🛍️
                                        </div>
                                    )}
                                    <div className="history-details flex flex-col">
                                        <span className="history-name text-white font-semibold text-lg">{item.name}</span>
                                        <div className="history-meta mt-1 text-sm text-gray-400">
                                            <span>{formatOrderDate(item.orderDate)}</span>
                                            <span className="mx-2">•</span>
                                            <span>Qty: {item.quantity}</span>
                                            <span className="mx-2">•</span>
                                            <span>EGP {item.price.toFixed(2)} ea</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="history-amount negative font-bold text-xl" style={{ color: '#f87171' }}>
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

export default RecentTransactions;
