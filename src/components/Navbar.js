export const renderNavbar = () => {
  return `
    <nav class="premium-navbar liquid-glass">
      <div class="nav-pill nav-pill-left">
        <div class="logo-container">
          <img src="Untitled design.png" alt="WAFRLY Icon" class="brand-icon-nav" style="height: 36px; width: auto; margin-right: 12px;" />
          <span class="text-logo">WAFRLY</span>
        </div>
      </div>

      <div class="nav-pill nav-pill-center">
        <ul class="main-nav-links">
          <li><a href="#" class="nav-link">Features</a></li>
          <li><a href="#" class="nav-link">Pricing</a></li>
          <li><a href="#" class="nav-link">Reviews</a></li>
        </ul>
      </div>

      <div class="nav-pill nav-pill-right">
        <div class="auth-buttons">
          <button class="login-btn">Log in</button>
          <button class="signup-btn">Get started</button>
        </div>
      </div>
    </nav>
    `;
};
export const initNavbar = () => {
  const navbar = document.querySelector('.premium-navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  const loginBtn = navbar.querySelector('.login-btn');
  const signupBtn = navbar.querySelector('.signup-btn');
  const logoBtn = navbar.querySelector('.logo-container');

  if (loginBtn) loginBtn.addEventListener('click', () => window.location.hash = '#login');
  if (signupBtn) signupBtn.addEventListener('click', () => window.location.hash = '#signup');
  if (logoBtn) {
    logoBtn.style.cursor = 'pointer';
    logoBtn.addEventListener('click', () => window.location.hash = '');
  }
};
