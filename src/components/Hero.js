export const renderHero = () => {
  const categories = [
    { name: "Electronics", color: "black" },
    { name: "Women's Fashion", color: "red" },
    { name: "Men's Fashion", color: "green" },
    { name: "Beauty & Health", color: "black" },
    { name: "Grocery", color: "green" },
    { name: "Gadgets", color: "red" },
    { name: "Trending", color: "black" },
    { name: "Accessories", color: "red" }
  ];

  const shapes = categories.map((cat, i) =>
    `<div class="floating-rect shape-${i} color-${cat.color}" data-index="${i}">
            <span class="shape-label">${cat.name}</span>
         </div>`
  ).join('');

  return `
    <section class="hero-section">
      <div class="morphic-background">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
      </div>
      
      <div class="floating-shapes-container">
        ${shapes}
      </div>
      
      <div class="hero-content">
        <h1 class="hero-title">Finance for the<br><span class="highlight">Design-Obsessed</span></h1>
        <p class="hero-subtitle">Experience the next generation of wealth management with premium visuals and effortless tracking.</p>
        <button id="hero-cta" class="get-started-btn">Get Started</button>
      </div>
    </section>
  `;
};

export const initHeroAnimation = () => {
  const shapes = document.querySelectorAll('.floating-rect');
  const cta = document.getElementById('hero-cta');

  if (!cta || shapes.length === 0) return;

  cta.addEventListener('click', () => window.location.hash = '#signup');

  let isHovered = false;

  const updatePositions = () => {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const heroRect = heroSection.getBoundingClientRect();
    const ctaRect = cta.getBoundingClientRect();

    // Position relative to the hero section container
    const ctaCenter = {
      x: ctaRect.left - heroRect.left + ctaRect.width / 2,
      y: ctaRect.top - heroRect.top + ctaRect.height / 2
    };

    shapes.forEach((shape, i) => {
      const angle = (i / shapes.length) * Math.PI * 2;
      const initialDist = 350 + (i * 40 % 150);
      const startX = heroRect.width / 2 + Math.cos(angle) * initialDist;
      const startY = heroRect.height / 2 + Math.sin(angle) * initialDist;

      const targetX = ctaCenter.x;
      const targetY = ctaCenter.y;

      shape.style.left = '0';
      shape.style.top = '0';

      if (isHovered) {
        shape.style.transition = 'all 1.0s cubic-bezier(0.25, 1, 0.5, 1)';
        shape.style.transform = `translate(${targetX}px, ${targetY - 10}px) translate(-50%, -50%) rotate(0deg) scale(0.6)`;
        shape.style.opacity = '0.4';
        shape.style.filter = 'blur(4px)';
      } else {
        const rotation = (i * 20 - 45);

        shape.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
        shape.style.transform = `translate(${startX}px, ${startY}px) translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
        shape.style.opacity = '1';
        shape.style.filter = 'blur(0px)';
      }
    });
  };

  cta.addEventListener('mouseenter', () => {
    isHovered = true;
    updatePositions();
  });

  cta.addEventListener('mouseleave', () => {
    isHovered = false;
    updatePositions();
  });

  window.addEventListener('resize', updatePositions);
  updatePositions();
};
