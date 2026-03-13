export const renderWealth = () => {
    return `
    <section class="wealth-section">
        <div class="wealth-header">
            <h2 class="wealth-title">Grow your wealth,<br>track your progress</h2>
        </div>

        <div class="wealth-grid">
            <!-- Card 1: All your money -->
            <div class="wealth-card card-all-money">
                <div class="card-header">
                    <h3>All your money, one screen</h3>
                    <p>Stocks, crypto, your house. No need to jump between five different apps to see your net worth.</p>
                </div>
                
                <div class="main-balance-chart">
                    <div class="balance-info">
                        <span class="trend pos">↗ 3.28%</span>
                        <div class="total-balance">$16,825</div>
                        <div class="balance-label">total balance</div>
                    </div>
                    <!-- Simplified SVG Line Chart -->
                    <svg class="main-svg" viewBox="0 0 400 100" preserveAspectRatio="none">
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="rgba(74, 222, 128, 0.2)" />
                            <stop offset="100%" stop-color="rgba(74, 222, 128, 0)" />
                        </linearGradient>
                        <path d="M0,80 Q20,85 40,70 T100,60 T150,70 T200,40 T250,50 T320,20 T400,10 L400,100 L0,100 Z" fill="url(#chartGradient)"></path>
                        <path d="M0,80 Q20,85 40,70 T100,60 T150,70 T200,40 T250,50 T320,20 T400,10" fill="none" class="main-path"></path>
                        <circle cx="400" cy="10" r="4" class="chart-point"></circle>
                    </svg>
                </div>

                <div class="accounts-list">
                    <div class="list-header">
                        <span>Accounts</span>
                        <span>3m balance change</span>
                    </div>
                    <div class="account-item">
                        <div class="acc-info">
                            <div class="acc-icon coinbase">C</div>
                            <div>
                                <div class="acc-name">Coinbase</div>
                                <div class="acc-time">2 hours ago</div>
                            </div>
                        </div>
                        <div class="acc-stats">
                            <span class="trend pos">↗ 12.2%</span>
                            <span class="acc-value">$3,200</span>
                        </div>
                    </div>
                    <div class="account-item">
                        <div class="acc-info">
                            <div class="acc-icon vanguard">V</div>
                            <div>
                                <div class="acc-name">Vanguard</div>
                                <div class="acc-time">2 hours ago</div>
                            </div>
                        </div>
                        <div class="acc-stats">
                            <span class="trend pos">↗ 1.32%</span>
                            <span class="acc-value">$6,231</span>
                        </div>
                    </div>
                    <div class="account-item">
                        <div class="acc-info">
                            <div class="acc-icon wealthfront">W</div>
                            <div>
                                <div class="acc-name">Wealthfront</div>
                                <div class="acc-time">2 hours ago</div>
                            </div>
                        </div>
                        <div class="acc-stats">
                            <span class="trend pos">↗ 1.84%</span>
                            <span class="acc-value">$2,904</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wealth-sub-grid">
                <!-- Card 2: Live Performance -->
                <div class="wealth-card card-performance">
                    <div class="card-header">
                        <h3>Live performance</h3>
                        <p>Live estimates. Check when you want to, not when you have to.</p>
                    </div>
                    <div class="ticker-grid">
                        <div class="ticker-item">
                            <div class="ticker-name">AAPL<br><span>Apple</span></div>
                            <svg class="sparkline" viewBox="0 0 100 30"><path d="M0,20 Q10,10 20,25 T40,5 T60,15 T80,0 T100,10" class="spark-pos"></path></svg>
                            <div class="ticker-badge pos">↗ 1.18%</div>
                        </div>
                        <div class="ticker-item">
                            <div class="ticker-name">RVGO<br><span>Rivian</span></div>
                            <svg class="sparkline" viewBox="0 0 100 30"><path d="M0,25 Q15,5 30,20 T60,5 T80,15 T100,0" class="spark-pos"></path></svg>
                            <div class="ticker-badge pos">↗ 3.82%</div>
                        </div>
                        <div class="ticker-item">
                            <div class="ticker-name">MSFT<br><span>Microsoft</span></div>
                            <svg class="sparkline" viewBox="0 0 100 30"><path d="M0,5 Q10,25 20,10 T40,30 T60,15 T80,25 T100,20" class="spark-neg"></path></svg>
                            <div class="ticker-badge neg">↘ 1.04%</div>
                        </div>
                        <div class="ticker-item">
                            <div class="ticker-name">VTI<br><span>Vanguard...</span></div>
                            <svg class="sparkline" viewBox="0 0 100 30"><path d="M0,15 Q20,20 40,5 T60,25 T80,10 T100,5" class="spark-pos"></path></svg>
                            <div class="ticker-badge pos">↗ 1.42%</div>
                        </div>
                    </div>
                </div>

                <div class="wealth-bottom-row">
                    <!-- Card 3: Allocation -->
                    <div class="wealth-card card-allocation">
                        <div class="card-header">
                            <h3>Allocation</h3>
                            <p>Too much crypto? Not enough bonds? See how diversified you are.</p>
                        </div>
                        <div class="allocation-list">
                            <div class="list-header">
                                <span>Allocation</span>
                                <span>by percentage</span>
                            </div>
                            <div class="alloc-item">
                                <span class="alloc-label">Equity</span>
                                <div class="alloc-bar-container"><div class="alloc-bar" style="width: 65%;"></div></div>
                            </div>
                            <div class="alloc-item">
                                <span class="alloc-label">Crypto</span>
                                <div class="alloc-bar-container"><div class="alloc-bar" style="width: 15%;"></div></div>
                            </div>
                            <div class="alloc-item">
                                <span class="alloc-label">ETF</span>
                                <div class="alloc-bar-container"><div class="alloc-bar" style="width: 12%;"></div></div>
                            </div>
                            <div class="alloc-item">
                                <span class="alloc-label">Cash</span>
                                <div class="alloc-bar-container"><div class="alloc-bar" style="width: 8%;"></div></div>
                            </div>
                        </div>
                    </div>

                    <!-- Card 4: Real Estate -->
                    <div class="wealth-card card-real-estate">
                        <div class="card-header">
                            <h3>Real estate</h3>
                            <p>Type in your address. We'll track what your place is worth.</p>
                        </div>
                        <div class="zillow-mockup">
                            <div class="zillow-header">
                                <span>←</span>
                                <span>REAL ESTATE ACCOUNT</span>
                            </div>
                            <div class="zillow-icon">Z<span>illow</span></div>
                            <div class="zillow-text">Start by entering a Zillow URL</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
};
