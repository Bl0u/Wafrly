import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './WhatIf.css';

const WhatIf = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('wafrly_user_name') || 'John Doe';

    // Read all orders from localStorage
    const savedOrders = useMemo(() => {
        return JSON.parse(localStorage.getItem(`wafrly_orders_${userName}`)) || [];
    }, [userName]);

    // Flatten all items and generate "What If" data
    const comparisonData = useMemo(() => {
        return savedOrders.flatMap(order => 
            order.items.map(item => {
                // Simulation logic: Find a lower price at a different seller
                const discountFactor = 0.7 + Math.random() * 0.2; // 10% to 30% discount
                const newPrice = item.price * discountFactor;
                
                // Simulated competitors list
                const competitors = ['Amazon.eg', 'Noon', 'B.TECH', 'Jumia', 'Carrefour', 'IKEA', 'H&M'];
                const filteredCompetitors = competitors.filter(c => c !== item.seller);
                const newSeller = filteredCompetitors[Math.floor(Math.random() * filteredCompetitors.length)];

                return {
                    ...item,
                    oldPrice: item.price,
                    oldSeller: item.seller || 'Local Store',
                    newPrice: newPrice,
                    newSeller: newSeller,
                    savings: (item.price - newPrice) * item.quantity,
                    orderDate: order.date
                };
            })
        );
    }, [savedOrders]);

    const totalPotentialSavings = comparisonData.reduce((sum, item) => sum + item.savings, 0);

    return (
        <div className="what-if-page">
            <header className="page-header">
                <button 
                    className="back-button" 
                    onClick={() => navigate('/dashboard')}
                >
                    ← Back to Overview
                </button>
                <div style={{ marginTop: '20px' }}>
                    <h1 className="page-title">What If? <span className="sparkle">✨</span></h1>
                    <p className="page-subtitle">See how much you could have saved by shopping elsewhere.</p>
                </div>
            </header>

            <div className="what-if-grid">
                {/* Savings Highlight */}
                <div className="savings-highlight-card liquid-glass animate-float">
                    <div className="highlight-content">
                        <span className="highlight-label">Total Potential Savings</span>
                        <div className="highlight-value">EGP {totalPotentialSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                        <p className="highlight-subtext">Based on your last {comparisonData.length} items purchased.</p>
                    </div>
                    <div className="highlight-icon">💰</div>
                </div>

                {/* Comparison Table */}
                <div className="dashboard-card comparison-card liquid-glass mt-8">
                    <div className="card-top border-b pb-4">
                        <span className="card-label">Detailed Price Comparison</span>
                    </div>

                    <div className="comparison-table-container mt-6">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Old Seller</th>
                                    <th>Old Price</th>
                                    <th>New Seller</th>
                                    <th>New Price</th>
                                    <th>Savings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-row">Start adding items in Transactions to see comparisons!</td>
                                    </tr>
                                ) : (
                                    comparisonData.map((item, index) => (
                                        <tr key={`${item.id}-${index}`}>
                                            <td className="product-name-cell">{item.name}</td>
                                            <td className="old-seller-cell">{item.oldSeller}</td>
                                            <td className="old-price-cell">EGP {item.oldPrice.toFixed(2)}</td>
                                            <td className="new-seller-cell">
                                                <span className="recommendation-badge">Recommended</span>
                                                {item.newSeller}
                                            </td>
                                            <td className="new-price-cell">EGP {item.newPrice.toFixed(2)}</td>
                                            <td className="savings-cell">
                                                +{item.savings.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="what-if-tip mt-12">
                <div className="tip-card liquid-glass">
                    <span className="tip-icon">💡</span>
                    <p><strong>Tip:</strong> Next time, try searching for "<strong>{comparisonData[0]?.name || 'Electronics'}</strong>" on <strong>{comparisonData[0]?.newSeller || 'Amazon'}</strong> before buying!</p>
                </div>
            </div>
        </div>
    );
};

export default WhatIf;
