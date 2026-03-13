import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Reusing auth styles

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        // Mocking a successful signup for local frontend demonstration
        setTimeout(() => {
            localStorage.setItem('wafrly_user_name', name);
            localStorage.setItem('wafrly_user_email', email);
            navigate('/login');
        }, 500);
    };

    return (
        <div className="auth-page">
            <div className="morphic-background">
                <div
                    className="blob auth-blob-1"
                    style={{ background: 'radial-gradient(circle, rgba(255,50,50,0.15) 0%, rgba(0,0,0,0) 70%)' }}
                ></div>
                <div
                    className="blob auth-blob-2"
                    style={{ background: 'radial-gradient(circle, rgba(50,255,50,0.1) 0%, rgba(0,0,0,0) 70%)' }}
                ></div>
            </div>

            <div className="auth-container liquid-glass">
                <div className="auth-header">
                    <img src="/WAFRLY.png" alt="WAFRLY" className="auth-logo" />
                    <h2>Create Account</h2>
                    <p>Join WAFRLY and master your wealth</p>
                </div>

                <form id="signup-form" className="auth-form" onSubmit={handleSignup}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="Create a password"
                            minLength="6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn">Sign Up</button>

                    {error && <div className="auth-error" style={{ display: 'block' }}>{error}</div>}
                </form>

                <p className="auth-redirect">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
