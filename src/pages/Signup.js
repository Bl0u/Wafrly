import './Login.css'; // Reusing the same premium auth styles

export const renderSignup = () => {
    return `
        <div class="auth-page">
            <div class="morphic-background">
                <div class="blob auth-blob-1" style="background: radial-gradient(circle, rgba(255,50,50,0.15) 0%, rgba(0,0,0,0) 70%);"></div>
                <div class="blob auth-blob-2" style="background: radial-gradient(circle, rgba(50,255,50,0.1) 0%, rgba(0,0,0,0) 70%);"></div>
            </div>
            
            <div class="auth-container liquid-glass">
                <div class="auth-header">
                    <img src="Untitled design.png" alt="WAFRLY" class="auth-logo" />
                    <h2>Create Account</h2>
                    <p>Join WAFRLY and master your wealth</p>
                </div>
                
                <form id="signup-form" class="auth-form">
                    <div class="input-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required placeholder="John Doe" />
                    </div>

                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required placeholder="name@example.com" />
                    </div>
                    
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required placeholder="Create a password" minlength="6" />
                    </div>
                    
                    <button type="submit" class="auth-submit-btn">Sign Up</button>
                    
                    <div id="signup-error" class="auth-error" style="display: none;"></div>
                </form>
                
                <p class="auth-redirect">
                    Already have an account? <a href="#login">Log in</a>
                </p>
            </div>
        </div>
    `;
};

export const initSignup = () => {
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) return;

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('signup-error');

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Auto login or redirect to login
                window.location.hash = '#login';
            } else {
                errorDiv.textContent = data.message || 'Signup failed';
                errorDiv.style.display = 'block';
            }
        } catch (error) {
            console.error('Signup error:', error);
            errorDiv.textContent = 'Network error. Please try again.';
            errorDiv.style.display = 'block';
        }
    });
};
