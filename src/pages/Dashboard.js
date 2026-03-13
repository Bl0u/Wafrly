import { renderFeedItem } from '../components/Feed/FeedItem.js';

export const renderDashboard = (container) => {
    const transactions = [
        { id: 1, title: 'Apple Store', amount: -1299.00, date: 'Today, 2:45 PM', category: 'Technology', icon: '💻' },
        { id: 2, title: 'Salary Deposit', amount: 4500.00, date: 'Today, 9:00 AM', category: 'Income', icon: '💰', status: 'income' },
        { id: 3, title: 'Whole Foods', amount: -84.20, date: 'Yesterday', category: 'Groceries', icon: '🥑' },
        { id: 4, title: 'Starbucks', amount: -6.50, date: 'Yesterday', category: 'Dining', icon: '☕' },
        { id: 5, title: 'Uber', amount: -15.00, date: 'Feb 24', category: 'Transport', icon: '🚗' },
    ];

    container.innerHTML = `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <div class="header-left">
          <h1 class="greeting">Good Morning, John</h1>
          <p class="sub-greeting">Here's what's happening with your money today.</p>
        </div>
        <div class="header-right">
          <button class="liquid-glass action-btn">Add Transaction +</button>
        </div>
      </header>

      <div class="dashboard-grid">
        <section class="feed-section">
          <h3 class="section-title">The Feed</h3>
          <div class="feed-list" id="feed-list">
            ${transactions.map(item => renderFeedItem(item)).join('')}
          </div>
        </section>

        <section class="highlights-section">
          <h3 class="section-title">Insights</h3>
          <div class="insights-grid">
            <div class="liquid-glass p-6 insight-card">
              <span class="insight-label">Net Worth</span>
              <h2 class="insight-value">$124,500.25</h2>
              <span class="insight-trend positive">↑ 2.4% this month</span>
            </div>
            <div class="liquid-glass p-6 insight-card">
              <span class="insight-label">Spending</span>
              <h2 class="insight-value">$3,240.00</h2>
              <span class="insight-trend neutral">On track</span>
            </div>
          </div>
          
          <h3 class="section-title mt-8">Recent Subscriptions</h3>
          <div class="liquid-glass p-6 subscriptions-card">
             <div class="sub-item">
               <span>Netflix</span>
               <span>$19.99/mo</span>
             </div>
             <div class="sub-item">
               <span>Spotify</span>
               <span>$10.99/mo</span>
             </div>
          </div>
        </section>
      </div>
    </div>
    `;

    // Add entry animation trigger
    const items = container.querySelectorAll('.feed-item, .insight-card');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s`;

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });
};
