import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                {/* Logo & Copyright Column */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <img src="/Untitled design.png" alt="WAFRLY Logo" className="brand-img" />
                    </div>
                    <div className="copyright">
                        © Copyright 2025 WAFRLY, Inc.<br />
                        Apple Card is issued by Goldman Sachs Bank USA, Salt Lake City Branch.
                    </div>
                </div>

                {/* Links Columns */}
                <div className="footer-links-wrapper">
                    <div className="footer-col">
                        <h4>Product</h4>
                        <Link to="/">Overview</Link>
                        <Link to="/">Features</Link>
                        <Link to="/">Pricing</Link>
                        <Link to="/">Download</Link>
                    </div>
                    <div className="footer-col">
                        <h4>Company</h4>
                        <Link to="/">About</Link>
                        <Link to="/">Careers</Link>
                        <Link to="/">Developer spotlight</Link>
                        <Link to="/">Terms</Link>
                        <Link to="/">Privacy Policy</Link>
                    </div>
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <Link to="/">Help Center</Link>
                        <Link to="/">Privacy & Security</Link>
                        <Link to="/">Country Leaderboard</Link>
                        <Link to="/">Wafrly for Employers</Link>
                        <Link to="/">Changelog</Link>
                    </div>
                    <div className="footer-col">
                        <h4>Social</h4>
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                        <a href="#">Email</a>
                    </div>
                </div>
            </div>

            {/* Floating Category Pills */}
            <div className="footer-pills-container">
                <div className="pill-track">
                    <div className="floating-pill pink" style={{ '--rot': '-45deg', '--pos': '20%' }}>
                        <span>🧸</span> BABY
                    </div>
                    <div className="floating-pill red" style={{ '--rot': '-15deg', '--pos': '32%' }}>
                        <span>🍎</span> GROCERIES
                    </div>
                    <div className="floating-pill gray" style={{ '--rot': '20deg', '--pos': '42%' }}>
                        <span>🪩</span> DANCING
                    </div>
                    <div className="floating-pill purple" style={{ '--rot': '5deg', '--pos': '53%' }}>
                        <span>🍸</span> DATE NIGHT
                    </div>
                    <div className="floating-pill orange" style={{ '--rot': '-35deg', '--pos': '66%' }}>
                        <span>🏠</span> HOME
                    </div>
                    <div className="floating-pill green" style={{ '--rot': '10deg', '--pos': '78%' }}>
                        <span>⛰️</span> HIKING
                    </div>
                    <div className="floating-pill orange-light" style={{ '--rot': '25deg', '--pos': '90%' }}>
                        <span>👫</span> WEDDING
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
