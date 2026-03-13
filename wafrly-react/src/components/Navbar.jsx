import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`premium-navbar liquid-glass ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-pill nav-pill-left">
                <div
                    className="logo-container"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src="/Untitled design.png"
                        alt="WAFRLY Icon"
                        className="brand-icon-nav"
                        style={{ height: '48px', width: 'auto', marginRight: '12px' }}
                    />
                    <span className="text-logo">WAFRLY</span>
                </div>
            </div>

            <div className="nav-pill nav-pill-center">
                <ul className="main-nav-links">
                    <li><Link to="/#features-root" className="nav-link">Features</Link></li>
                    <li><Link to="/#pricing-root" className="nav-link">Pricing</Link></li>
                    <li><Link to="/#wealth-root" className="nav-link">Reviews</Link></li>
                </ul>
            </div>

            <div className="nav-pill nav-pill-right">
                <div className="auth-buttons">
                    <button className="login-btn" onClick={() => navigate('/login')}>Log in</button>
                    <button className="signup-btn" onClick={() => navigate('/signup')}>Get started</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
