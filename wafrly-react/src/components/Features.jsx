import React from 'react';
import './Features.css';

const Features = () => {
    return (
        <section className="features-section">
            <div className="features-header">
                <h2 className="features-title">Track your spending,<br />boost your savings</h2>
            </div>

            <div className="bento-grid">
                {/* Card 1: Spending Insights */}
                <div className="bento-card card-lg card-spending">
                    <div className="card-content">
                        <div className="text-side">
                            <h3>Know where your money goes</h3>
                            <p>Our AI learns your spending patterns and tags every transaction automatically. The more you use it, the smarter it gets.</p>
                        </div>
                        <div className="visual-side" style={{ position: 'relative', overflow: 'hidden' }}>
                            <div className="ai-scanner-line"></div>
                            <div className="transaction-list">
                                <div className="transaction-header">Transactions to review</div>
                                <div className="transaction-item">
                                    <span className="merchant">Peloton</span>
                                    <span className="tag tag-health">HEALTH</span>
                                </div>
                                <div className="transaction-item">
                                    <span className="merchant">Walmart+</span>
                                    <span className="tag tag-groceries">GROCERIES</span>
                                </div>
                                <div className="transaction-item">
                                    <span className="merchant">Netflix</span>
                                    <span className="tag tag-subscriptions">SUBSCRIPTIONS</span>
                                </div>
                                <div className="transaction-item">
                                    <span className="merchant">Target</span>
                                    <span className="tag tag-shops">SHOPS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Follow the line */}
                <div className="bento-card card-md card-line-chart">
                    <div className="card-content">
                        <h3>Follow the line</h3>
                        <p>Start your day with a quick look at your spending line, pending refunds, and upcoming bills.</p>
                        <div className="chart-container">
                            <div className="chart-tag">$123 under</div>
                            <svg className="line-chart-svg" viewBox="0 0 300 120">
                                <path d="M0,80 Q50,90 80,60 T150,70 T220,40 T300,50" fill="none" className="chart-path"></path>
                                <circle cx="220" cy="40" r="4" className="chart-point"></circle>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Card 3: Rollovers */}
                <div className="bento-card card-sm card-rollovers">
                    <div className="card-content">
                        <h3>Rollovers</h3>
                        <p>Didn't spend your budget this month? Roll it over and save up for bigger purchases.</p>
                    </div>
                </div>

                {/* Card 4: Entertainment Focus */}
                <div className="bento-card card-md card-entertainment">
                    <div className="card-content">
                        <div className="entertainment-header">
                            <div className="icon-circle">🎭</div>
                            <h4>Entertainment</h4>
                        </div>
                        <div className="spending-stats">
                            <div className="stat">
                                <span className="label">SPENT</span>
                                <span className="value">$25.48</span>
                                <span className="sub">$12.52 under</span>
                            </div>
                            <div className="stat">
                                <span className="label">ROLLOVER</span>
                                <span className="value">$42.33</span>
                                <span className="sub">from Feb</span>
                            </div>
                        </div>
                        <div className="bar-chart">
                            <div className="bar" style={{ height: '40%' }}></div>
                            <div className="bar highlight" style={{ height: '70%' }}></div>
                            <div className="bar" style={{ height: '50%' }}></div>
                            <div className="bar" style={{ height: '30%' }}></div>
                            <div className="bar" style={{ height: '60%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Card 5: Cash flow */}
                <div className="bento-card card-sm card-cashflow">
                    <div className="card-content">
                        <h3>Cash flow</h3>
                        <p>Income up, expenses down. Track trends with monthly summaries.</p>
                        <div className="cash-flow-list">
                            <div className="cash-flow-inner">
                                <div className="flow-item"><span>⚡ Utilities</span> <span className="pos">+$165</span></div>
                                <div className="flow-item"><span>🔑 Rent</span> <span className="pos">+$420</span></div>
                                <div className="flow-item"><span>🍔 Food & Drink</span> <span className="pos">+$240</span></div>
                                <div className="flow-item"><span>🚗 Transport</span> <span className="neg">-$80</span></div>
                                <div className="flow-item"><span>🛍️ Shopping</span> <span className="neg">-$150</span></div>
                                <div className="flow-item"><span>🎭 Entertainment</span> <span className="neg">-$120</span></div>

                                <div className="flow-item"><span>⚡ Utilities</span> <span className="pos">+$165</span></div>
                                <div className="flow-item"><span>🔑 Rent</span> <span className="pos">+$420</span></div>
                                <div className="flow-item"><span>🍔 Food & Drink</span> <span className="pos">+$240</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 6: Subscriptions */}
                <div className="bento-card card-sm card-subs">
                    <div className="card-content">
                        <h3>Spot subscriptions</h3>
                        <p>That streaming service you forgot about? We didn't.</p>
                        <div className="subs-list">
                            <div className="sub-item">
                                <span className="date">Dec 1</span>
                                <span className="name">Streaming Service</span>
                            </div>
                            <div className="sub-item">
                                <span className="date">Dec 1</span>
                                <span className="name">Gym Membership</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
