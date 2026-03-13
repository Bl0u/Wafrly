export const renderLayout = (content) => `
    <div class="layout-container">
      <aside class="sidebar liquid-glass">
        <div class="sidebar-logo">
          <span class="logo-icon">▲</span>
          <span class="logo-text">wafrly</span>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-item active">
            <span class="nav-icon">📊</span>
            <span class="nav-label">Dashboard</span>
          </div>
          <div class="nav-item">
            <span class="nav-icon">💸</span>
            <span class="nav-label">Spending</span>
          </div>
          <div class="nav-item">
            <span class="nav-icon">🏢</span>
            <span class="nav-label">Accounts</span>
          </div>
          <div class="nav-item">
            <span class="nav-icon">📈</span>
            <span class="nav-label">Investments</span>
          </div>
        </nav>
        <div class="sidebar-footer">
          <div class="user-profile">
            <div class="avatar">JD</div>
            <span class="username">John Doe</span>
          </div>
        </div>
      </aside>
      <main class="main-content">
        ${content}
      </main>
    </div>
`;
