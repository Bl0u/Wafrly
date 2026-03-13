export const renderPricing = (container) => {
  let billingCycle = 'annual'; // 'monthly' or 'annual'

  const updatePrices = () => {
    const individualPrice = billingCycle === 'annual' ? '7.92' : '13.00';
    const proPrice = billingCycle === 'annual' ? '12.50' : '19.00';
    const annualLabel = billingCycle === 'annual' ? '<span class="billed-annually">Billed annually</span>' : '<span class="billed-monthly">Billed monthly</span>';

    container.querySelector('#individual-price').textContent = individualPrice;
    container.querySelector('#individual-billing-label').innerHTML = annualLabel;

    container.querySelector('#pro-price').textContent = proPrice;
    container.querySelector('#pro-billing-label').innerHTML = annualLabel;

    // Toggle Slider Animation
    const slider = container.querySelector('.toggle-slider');
    if (billingCycle === 'annual') {
      slider.style.transform = 'translateX(94px)';
    } else {
      slider.style.transform = 'translateX(4px)';
    }
  };

  container.innerHTML = `
    <div class="pricing-container #pricing-dark">
      <div class="pricing-header">
        <h1 class="pricing-title">Simple, transparent pricing</h1>
        <p class="pricing-subtitle">Start with a 1-month free trial. Cancel anytime.</p>
        
        <div class="billing-toggle-container">
          <div class="billing-toggle liquid-glass">
            <div class="toggle-slider"></div>
            <button class="toggle-btn" data-cycle="monthly">Monthly</button>
            <button class="toggle-btn" data-cycle="annual">Annual</button>
          </div>
          <span class="save-tag">SAVE 39%</span>
        </div>
      </div>

      <div class="pricing-grid">
        <div class="pricing-card liquid-glass">
          <div class="card-header">
            <h3 class="plan-name">Individual</h3>
            <div class="plan-price">
              <span class="currency">$</span>
              <span class="amount" id="individual-price">7.92</span>
              <span class="period">/mo</span>
            </div>
            <p class="billing-note" id="individual-billing-label">Billed annually</p>
          </div>
          
          <ul class="features-list">
            <li><span class="check">✓</span> All accounts in one place</li>
            <li><span class="check">✓</span> Real-time expense tracking</li>
            <li><span class="check">✓</span> Custom budget categories</li>
            <li><span class="check">✓</span> Investment portfolio monitor</li>
            <li><span class="check">✓</span> AI-powered insights</li>
          </ul>

          <button class="start-btn">Start 1-month free trial</button>
        </div>

        <div class="pricing-card liquid-glass accent-card">
          <div class="card-header">
            <h3 class="plan-name">Pro</h3>
            <div class="plan-price">
              <span class="currency">$</span>
              <span class="amount" id="pro-price">12.50</span>
              <span class="period">/mo</span>
            </div>
            <p class="billing-note" id="pro-billing-label">Billed annually</p>
          </div>
          
          <ul class="features-list">
            <li><span class="check">✓</span> Everything in Individual</li>
            <li><span class="check">✓</span> Advanced custom reporting</li>
            <li><span class="check">✓</span> Multi-currency support</li>
            <li><span class="check">✓</span> Tax optimization tools</li>
            <li><span class="check">✓</span> Priority 24/7 support</li>
          </ul>

          <button class="start-btn">Start 1-month free trial</button>
        </div>
      </div>
    </div>
    `;

  // Initialize toggle logic
  const btns = container.querySelectorAll('.toggle-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      billingCycle = btn.dataset.cycle;
      updatePrices();

      // UI Active State
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Set initial state
  container.querySelector(`[data-cycle="${billingCycle}"]`).classList.add('active');
  updatePrices();

  // Setup initial CSS animation classes
  const cards = container.querySelectorAll('.pricing-card');
  if (cards.length > 0) cards[0].classList.add('animate-left');
  if (cards.length > 1) cards[1].classList.add('animate-right');

  // High-performance 60fps IntersectionObserver for native CSS 3D Transforms
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Once animated in, we can unobserve to keep it snapped in place
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2, // Trigger when 20% of the card is visible
    rootMargin: '50px' // Start slightly before it fully enters
  });

  cards.forEach(card => observer.observe(card));
};
