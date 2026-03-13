export const renderFeatures = () => {
    return `
    <section class="features-section">
        <div class="features-header">
            <h2 class="features-title">Track your spending,<br>boost your savings</h2>
        </div>

        <div class="bento-grid">
            <!-- Card 1: Spending Insights -->
            <div class="bento-card card-lg card-spending">
                <div class="card-content">
                    <div class="text-side">
                        <h3>Know where your money goes</h3>
                        <p>Our AI learns your spending patterns and tags every transaction automatically. The more you use it, the smarter it gets.</p>
                    </div>
                    <div class="visual-side">
                        <div class="transaction-list">
                            <div class="transaction-header">Transactions to review</div>
                            <div class="transaction-item">
                                <span class="merchant">Peloton</span>
                                <span class="tag tag-health">HEALTH</span>
                            </div>
                            <div class="transaction-item">
                                <span class="merchant">Walmart+</span>
                                <span class="tag tag-groceries">GROCERIES</span>
                            </div>
                            <div class="transaction-item">
                                <span class="merchant">Netflix</span>
                                <span class="tag tag-subscriptions">SUBSCRIPTIONS</span>
                            </div>
                            <div class="transaction-item">
                                <span class="merchant">Target</span>
                                <span class="tag tag-shops">SHOPS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 2: Follow the line -->
            <div class="bento-card card-md card-line-chart">
                <div class="card-content">
                    <h3>Follow the line</h3>
                    <p>Start your day with a quick look at your spending line, pending refunds, and upcoming bills.</p>
                    <div class="chart-container">
                        <div class="chart-tag">$123 under</div>
                        <svg class="line-chart-svg" viewBox="0 0 300 120">
                            <path d="M0,80 Q50,90 80,60 T150,70 T220,40 T300,50" fill="none" class="chart-path"></path>
                            <circle cx="220" cy="40" r="4" class="chart-point"></circle>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Card 3: Rollovers -->
            <div class="bento-card card-sm card-rollovers">
                <div class="card-content">
                    <h3>Rollovers</h3>
                    <p>Didn't spend your budget this month? Roll it over and save up for bigger purchases.</p>
                </div>
            </div>

            <!-- Card 4: Entertainment Focus -->
            <div class="bento-card card-md card-entertainment">
                <div class="card-content">
                    <div class="entertainment-header">
                        <div class="icon-circle">🎭</div>
                        <h4>Entertainment</h4>
                    </div>
                    <div class="spending-stats">
                        <div class="stat">
                            <span class="label">SPENT</span>
                            <span class="value">$25.48</span>
                            <span class="sub">$12.52 under</span>
                        </div>
                        <div class="stat">
                            <span class="label">ROLLOVER</span>
                            <span class="value">$42.33</span>
                            <span class="sub">from Feb</span>
                        </div>
                    </div>
                    <div class="bar-chart">
                        <div class="bar" style="height: 40%"></div>
                        <div class="bar highlight" style="height: 70%"></div>
                        <div class="bar" style="height: 50%"></div>
                        <div class="bar" style="height: 30%"></div>
                        <div class="bar" style="height: 60%"></div>
                    </div>
                </div>
            </div>

            <!-- Card 5: Cash flow -->
            <div class="bento-card card-sm card-cashflow">
                <div class="card-content">
                    <h3>Cash flow</h3>
                    <p>Income up, expenses down. Track trends with monthly summaries.</p>
                    <div class="cash-flow-list">
                        <div class="cash-flow-inner">
                            <div class="flow-item"><span>⚡ Utilities</span> <span class="pos">+$165</span></div>
                            <div class="flow-item"><span>🔑 Rent</span> <span class="pos">+$420</span></div>
                            <div class="flow-item"><span>🍔 Food & Drink</span> <span class="pos">+$240</span></div>
                            <div class="flow-item"><span>🚗 Transport</span> <span class="neg">-$80</span></div>
                            <div class="flow-item"><span>🛍️ Shopping</span> <span class="neg">-$150</span></div>
                            <div class="flow-item"><span>🎭 Entertainment</span> <span class="neg">-$120</span></div>
                            <!-- Duplicated for loop -->
                            <div class="flow-item"><span>⚡ Utilities</span> <span class="pos">+$165</span></div>
                            <div class="flow-item"><span>🔑 Rent</span> <span class="pos">+$420</span></div>
                            <div class="flow-item"><span>🍔 Food & Drink</span> <span class="pos">+$240</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 6: Subscriptions -->
            <div class="bento-card card-sm card-subs">
                <div class="card-content">
                    <h3>Spot subscriptions</h3>
                    <p>That streaming service you forgot about? We didn't.</p>
                    <div class="subs-list">
                        <div class="sub-item">
                            <span class="date">Dec 1</span>
                            <span class="name">Streaming Service</span>
                        </div>
                        <div class="sub-item">
                            <span class="date">Dec 1</span>
                            <span class="name">Gym Membership</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
};
