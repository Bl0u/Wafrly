import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './GenerateReport.css';

const GenerateReport = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('wafrly_user_name') || 'John Doe';
    
    // Read all orders from localStorage
    const savedOrders = useMemo(() => {
        return JSON.parse(localStorage.getItem(`wafrly_orders_${userName}`)) || [];
    }, [userName]);

    // Flatten all items from all orders
    const allItems = useMemo(() => {
        return savedOrders.flatMap(order => 
            order.items.map(item => ({
                ...item,
                orderDate: order.date
            }))
        );
    }, [savedOrders]);

    // Calculate statistics
    const stats = useMemo(() => {
        const totalSpent = allItems.reduce((sum, item) => sum + item.totalPrice, 0);
        const totalItems = allItems.reduce((sum, item) => sum + item.quantity, 0);
        const categories = [...new Set(allItems.map(item => item.category || 'Other'))];
        
        return { totalSpent, totalItems, categoryCount: categories.length };
    }, [allItems]);

    const formatOrderDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="generate-report-page">
            <header className="page-header">
                <button 
                    className="back-button" 
                    onClick={() => navigate('/dashboard')}
                >
                    ← Back to Overview
                </button>
                <div style={{ marginTop: '20px' }}>
                    <h1 className="page-title">Executive Financial Report</h1>
                    <p className="page-subtitle">Detailed breakdown of all your purchases and spending habits.</p>
                </div>
            </header>

            <div className="report-grid">
                {/* Summary Cards */}
                <div className="report-summary-cards">
                    <div className="report-card liquid-glass">
                        <span className="card-label">Total Volume Spent</span>
                        <div className="card-value">EGP {stats.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    </div>
                    <div className="report-card liquid-glass">
                        <span className="card-label">Total Items Tracked</span>
                        <div className="card-value">{stats.totalItems}</div>
                    </div>
                    <div className="report-card liquid-glass">
                        <span className="card-label">Category Diversity</span>
                        <div className="card-value">{stats.categoryCount} Types</div>
                    </div>
                </div>

                {/* Main Detailed Report */}
                <div className="dashboard-card report-table-card liquid-glass mt-8">
                    <div className="card-top border-b pb-4 flex justify-between items-center">
                        <span className="card-label">Comprehensive Itemized List</span>
                        <button className="export-btn" onClick={() => window.print()}>Print Report</button>
                    </div>

                    <div className="report-table-container mt-6">
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Product</th>
                                    <th>Count</th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                    <th>Type (Category)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allItems.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-row">No transactions found to generate report.</td>
                                    </tr>
                                ) : (
                                    allItems.map((item, index) => (
                                        <tr key={`${item.id}-${index}`}>
                                            <td>{formatOrderDate(item.orderDate)}</td>
                                            <td className="item-name-cell">{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>EGP {item.price.toFixed(2)}</td>
                                            <td className="price-cell">EGP {item.totalPrice.toFixed(2)}</td>
                                            <td>
                                                <span className="category-pill-small">
                                                    {item.category === 'Essential' ? 'Essential' : 'Discretionary'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <footer className="report-footer mt-12 text-center text-gray-500 text-sm italic">
                Generated automatically by Wafrly AI Financial Assistant
            </footer>
        </div>
    );
};

export default GenerateReport;
