export const renderFeedItem = ({ title, amount, date, category, icon, status }) => {
    const formattedAmount = amount < 0 ? `-$${Math.abs(amount).toFixed(2)}` : `$${amount.toFixed(2)}`;

    return `
    <div class="liquid-glass p-6 feed-item">
      <div class="feed-item-left">
        <div class="feed-icon-container">
          <span class="feed-icon">${icon}</span>
        </div>
        <div class="feed-details">
          <h4 class="feed-title">${title}</h4>
          <span class="feed-category">${category}</span>
        </div>
      </div>
      <div class="feed-item-right">
        <div class="feed-amount ${status || 'expense'}">
          ${formattedAmount}
        </div>
        <span class="feed-date">${date}</span>
      </div>
    </div>
  `;
};
