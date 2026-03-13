import './Login.css';

export const renderLogin = () => {
    return `
        <div class="auth-page">
            <div class="morphic-background">
                <div class="blob auth-blob-1"></div>
                <div class="blob auth-blob-2"></div>
            </div>
            
            <div class="auth-container liquid-glass">
                <div class="auth-header">
                    <img src="Untitled design.png" alt="WAFRLY" class="auth-logo" />
                    <h2>Welcome Back</h2>
                    <p>Enter your details to access your premium account</p>
                </div>
                
                <form id="login-form" class="auth-form">
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required placeholder="name@example.com" />
                    </div>
                    
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required placeholder="Enter your password" />
                    </div>
                    
                    <button type="submit" class="auth-submit-btn">Log In</button>
                    
                    <div id="login-error" class="auth-error" style="display: none;"></div>
                </form>
                
                <p class="auth-redirect">
                    Don't have an account? <a href="#signup">Get started</a>
                </p>
            </div>
        </div>
    `;
};

export const initLogin = () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('login-error');

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Save token
                localStorage.setItem('wafrly_token', data.token);
                // Redirect to dashboard or home
                window.location.hash = ''; // Back to home for now
            } else {
                errorDiv.textContent = data.message || 'Login failed';
                errorDiv.style.display = 'block';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorDiv.textContent = 'Network error. Please try again.';
            errorDiv.style.display = 'block';
        }
    });
};
