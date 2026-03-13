import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Mocking a successful login for local frontend demonstration
        setTimeout(() => {
            const parsedName = email.split('@')[0];
            const displayName = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);
            localStorage.setItem('wafrly_token', 'mock_dev_token_123');
            localStorage.setItem('wafrly_user_email', email);

            // Only set a generated name if one wasn't created during Signup
            if (!localStorage.getItem('wafrly_user_name')) {
                localStorage.setItem('wafrly_user_name', displayName);
            }

            navigate('/dashboard'); // Redirect to the app interface
        }, 500);
    };

    return (
        <div className="auth-page">
            <div className="morphic-background">
                <div className="blob auth-blob-1"></div>
                <div className="blob auth-blob-2"></div>
            </div>

            <div className="auth-container liquid-glass">
                <div className="auth-header">
                    {/* using /WAFRLY.png from public folder */}
                    <img src="/WAFRLY.png" alt="WAFRLY" className="auth-logo" />
                    <h2>Welcome Back</h2>
                    <p>Enter your details to access your premium account</p>
                </div>

                <form id="login-form" className="auth-form" onSubmit={handleLogin}>
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn">Log In</button>

                    {error && <div className="auth-error" style={{ display: 'block' }}>{error}</div>}
                </form>

                <p className="auth-redirect">
                    Don't have an account? <Link to="/signup">Get started</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
