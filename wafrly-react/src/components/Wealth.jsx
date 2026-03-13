import React from 'react';
import './Wealth.css';

const Wealth = () => {
    return (
        <section className="wealth-section">
            <div className="wealth-header">
                <h2 className="wealth-title">Grow your wealth,<br />track your progress</h2>
            </div>

            <div className="wealth-grid">
                {/* Card 1: All your money */}
                <div className="wealth-card card-all-money">
                    <div className="card-header">
                        <h3>All your money, one screen</h3>
                        <p>Stocks, crypto, your house. No need to jump between five different apps to see your net worth.</p>
                    </div>

                    <div className="main-balance-chart">
                        <div className="balance-info">
                            <span className="trend pos">↗ 3.28%</span>
                            <div className="total-balance">$16,825</div>
                            <div className="balance-label">total balance</div>
                        </div>
                        {/* Simplified SVG Line Chart */}
                        <svg className="main-svg" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(74, 222, 128, 0.2)" />
                                <stop offset="100%" stopColor="rgba(74, 222, 128, 0)" />
                            </linearGradient>
                            <path d="M0,80 Q20,85 40,70 T100,60 T150,70 T200,40 T250,50 T320,20 T400,10 L400,100 L0,100 Z" fill="url(#chartGradient)"></path>
                            <path d="M0,80 Q20,85 40,70 T100,60 T150,70 T200,40 T250,50 T320,20 T400,10" fill="none" className="main-path"></path>
                            <circle cx="400" cy="10" r="4" className="chart-point"></circle>
                        </svg>
                    </div>

                    <div className="accounts-list">
                        <div className="list-header">
                            <span>Accounts</span>
                            <span>3m balance change</span>
                        </div>
                        <div className="account-item">
                            <div className="acc-info">
                                <div className="acc-icon coinbase">C</div>
                                <div>
                                    <div className="acc-name">Coinbase</div>
                                    <div className="acc-time">2 hours ago</div>
                                </div>
                            </div>
                            <div className="acc-stats">
                                <span className="trend pos">↗ 12.2%</span>
                                <span className="acc-value">$3,200</span>
                            </div>
                        </div>
                        <div className="account-item">
                            <div className="acc-info">
                                <div className="acc-icon vanguard">V</div>
                                <div>
                                    <div className="acc-name">Vanguard</div>
                                    <div className="acc-time">2 hours ago</div>
                                </div>
                            </div>
                            <div className="acc-stats">
                                <span className="trend pos">↗ 1.32%</span>
                                <span className="acc-value">$6,231</span>
                            </div>
                        </div>
                        <div className="account-item">
                            <div className="acc-info">
                                <div className="acc-icon wealthfront">W</div>
                                <div>
                                    <div className="acc-name">Wealthfront</div>
                                    <div className="acc-time">2 hours ago</div>
                                </div>
                            </div>
                            <div className="acc-stats">
                                <span className="trend pos">↗ 1.84%</span>
                                <span className="acc-value">$2,904</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wealth-sub-grid">
                    {/* Card 2: Live Performance */}
                    <div className="wealth-card card-performance">
                        <div className="card-header">
                            <h3>Live performance</h3>
                            <p>Live estimates. Check when you want to, not when you have to.</p>
                        </div>
                        <div className="ticker-grid">
                            <div className="ticker-item">
                                <div className="ticker-name">AAPL<br /><span>Apple</span></div>
                                <svg className="sparkline" viewBox="0 0 100 30"><path d="M0,20 Q10,10 20,25 T40,5 T60,15 T80,0 T100,10" className="spark-pos"></path></svg>
                                <div className="ticker-badge pos">↗ 1.18%</div>
                            </div>
                            <div className="ticker-item">
                                <div className="ticker-name">RVGO<br /><span>Rivian</span></div>
                                <svg className="sparkline" viewBox="0 0 100 30"><path d="M0,25 Q15,5 30,20 T60,5 T80,15 T100,0" className="spark-pos"></path></svg>
                                <div className="ticker-badge pos">↗ 3.82%</div>
                            </div>
                            <div className="ticker-item">
                                <div className="ticker-name">MSFT<br /><span>Microsoft</span></div>
                                <svg className="sparkline" viewBox="0 0 100 30"><path d="M0,5 Q10,25 20,10 T40,30 T60,15 T80,25 T100,20" className="spark-neg"></path></svg>
                                <div className="ticker-badge neg">↘ 1.04%</div>
                            </div>
                            <div className="ticker-item">
                                <div className="ticker-name">VTI<br /><span>Vanguard...</span></div>
                                <svg className="sparkline" viewBox="0 0 100 30"><path d="M0,15 Q20,20 40,5 T60,25 T80,10 T100,5" className="spark-pos"></path></svg>
                                <div className="ticker-badge pos">↗ 1.42%</div>
                            </div>
                        </div>
                    </div>

                    <div className="wealth-bottom-row">
                        {/* Card 3: Allocation */}
                        <div className="wealth-card card-allocation">
                            <div className="card-header">
                                <h3>Allocation</h3>
                                <p>Too much crypto? Not enough bonds? See how diversified you are.</p>
                            </div>
                            <div className="allocation-list">
                                <div className="list-header">
                                    <span>Allocation</span>
                                    <span>by percentage</span>
                                </div>
                                <div className="alloc-item">
                                    <span className="alloc-label">Equity</span>
                                    <div className="alloc-bar-container"><div className="alloc-bar" style={{ width: '65%' }}></div></div>
                                </div>
                                <div className="alloc-item">
                                    <span className="alloc-label">Crypto</span>
                                    <div className="alloc-bar-container"><div className="alloc-bar" style={{ width: '15%' }}></div></div>
                                </div>
                                <div className="alloc-item">
                                    <span className="alloc-label">ETF</span>
                                    <div className="alloc-bar-container"><div className="alloc-bar" style={{ width: '12%' }}></div></div>
                                </div>
                                <div className="alloc-item">
                                    <span className="alloc-label">Cash</span>
                                    <div className="alloc-bar-container"><div className="alloc-bar" style={{ width: '8%' }}></div></div>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Real Estate */}
                        <div className="wealth-card card-real-estate">
                            <div className="card-header">
                                <h3>Real estate</h3>
                                <p>Type in your address. We'll track what your place is worth.</p>
                            </div>
                            <div className="zillow-mockup">
                                <div className="zillow-header">
                                    <span>←</span>
                                    <span>REAL ESTATE ACCOUNT</span>
                                </div>
                                <div className="zillow-icon">Z<span>illow</span></div>
                                <div className="zillow-text">Start by entering a Zillow URL</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Wealth;
