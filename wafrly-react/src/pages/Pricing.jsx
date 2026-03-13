import React, { useState, useEffect, useRef } from 'react';
import './Pricing.css';

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('annual');
    const cardsRef = useRef([]);

    const individualPrice = billingCycle === 'annual' ? '7.92' : '13.00';
    const proPrice = billingCycle === 'annual' ? '12.50' : '19.00';
    const isAnnual = billingCycle === 'annual';

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of the card is visible
            rootMargin: '50px' // Start slightly before it fully enters
        });

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="pricing-container pricing-dark">
            <div className="pricing-header">
                <h1 className="pricing-title">Simple, transparent pricing</h1>
                <p className="pricing-subtitle">Start with a 1-month free trial. Cancel anytime.</p>

                <div className="billing-toggle-container">
                    <div className="billing-toggle liquid-glass">
                        <div
                            className="toggle-slider"
                            style={{ transform: isAnnual ? 'translateX(94px)' : 'translateX(4px)' }}
                        />
                        <button
                            className={`toggle-btn ${!isAnnual ? 'active' : ''}`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={`toggle-btn ${isAnnual ? 'active' : ''}`}
                            onClick={() => setBillingCycle('annual')}
                        >
                            Annual
                        </button>
                    </div>
                    <span className="save-tag">SAVE 39%</span>
                </div>
            </div>

            <div className="pricing-grid">
                <div
                    className="pricing-card liquid-glass animate-left"
                    ref={el => cardsRef.current[0] = el}
                >
                    <div className="card-header">
                        <h3 className="plan-name">Individual</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>
                            <span className="amount">{individualPrice}</span>
                            <span className="period">/mo</span>
                        </div>
                        <p className="billing-note">
                            {isAnnual ? <span className="billed-annually">Billed annually</span> : <span className="billed-monthly">Billed monthly</span>}
                        </p>
                    </div>

                    <ul className="features-list">
                        <li><span className="check">✓</span> All accounts in one place</li>
                        <li><span className="check">✓</span> Real-time expense tracking</li>
                        <li><span className="check">✓</span> Custom budget categories</li>
                        <li><span className="check">✓</span> Investment portfolio monitor</li>
                        <li><span className="check">✓</span> AI-powered insights</li>
                    </ul>

                    <button className="start-btn">Start 1-month free trial</button>
                </div>

                <div
                    className="pricing-card liquid-glass accent-card animate-right"
                    ref={el => cardsRef.current[1] = el}
                >
                    <div className="card-header">
                        <h3 className="plan-name">Pro</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>
                            <span className="amount">{proPrice}</span>
                            <span className="period">/mo</span>
                        </div>
                        <p className="billing-note">
                            {isAnnual ? <span className="billed-annually">Billed annually</span> : <span className="billed-monthly">Billed monthly</span>}
                        </p>
                    </div>

                    <ul className="features-list">
                        <li><span className="check">✓</span> Everything in Individual</li>
                        <li><span className="check">✓</span> Advanced custom reporting</li>
                        <li><span className="check">✓</span> Multi-currency support</li>
                        <li><span className="check">✓</span> Tax optimization tools</li>
                        <li><span className="check">✓</span> Priority 24/7 support</li>
                    </ul>

                    <button className="start-btn">Start 1-month free trial</button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
