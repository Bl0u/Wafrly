import { renderNavbar, initNavbar } from './components/Navbar.js';
import { renderHero, initHeroAnimation } from './components/Hero.js';
import { renderPricing } from './pages/Pricing.js';
import { renderFeatures } from './components/Features.js';
import { renderWealth } from './components/Wealth.js';
import { renderFooter } from './components/Footer.js';
import { renderLogin, initLogin } from './pages/Login.js';
import { renderSignup, initSignup } from './pages/Signup.js';

const app = document.getElementById('app');

const renderHome = () => {
    app.innerHTML = `
        ${renderNavbar()}
        <div id="hero-root"></div>
        <div id="pricing-root"></div>
        <div id="features-root"></div>
        <div id="wealth-root"></div>
        <div id="footer-root"></div>
    `;
    initNavbar();

    const heroRoot = document.getElementById('hero-root');
    heroRoot.innerHTML = renderHero();
    initHeroAnimation();

    const pricingRoot = document.getElementById('pricing-root');
    renderPricing(pricingRoot);

    const featuresRoot = document.getElementById('features-root');
    featuresRoot.innerHTML = renderFeatures();

    const wealthRoot = document.getElementById('wealth-root');
    wealthRoot.innerHTML = renderWealth();

    const footerRoot = document.getElementById('footer-root');
    footerRoot.innerHTML = renderFooter();
};

const renderLoginView = () => {
    app.innerHTML = renderLogin();
    initLogin();
};

const renderSignupView = () => {
    app.innerHTML = renderSignup();
    initSignup();
};

const router = () => {
    const hash = window.location.hash;

    if (hash === '#login') {
        renderLoginView();
    } else if (hash === '#signup') {
        renderSignupView();
    } else {
        renderHome();
    }

    window.scrollTo(0, 0); // Scroll to top on navigation
};

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', router);
