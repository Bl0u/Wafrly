export const renderFooter = () => {
    return `
    <footer class="app-footer">
        <div class="footer-content">
            <!-- Logo & Copyright Column -->
            <div class="footer-brand">
                <div class="footer-logo">
                    <img src="Untitled design.png" alt="WAFRLY Logo" class="brand-img" />
                </div>
                <div class="copyright">
                    © Copyright 2025 WAFRLY, Inc.<br>
                    Apple Card is issued by Goldman Sachs Bank USA, Salt Lake City Branch.
                </div>
            </div>

            <!-- Links Columns -->
            <div class="footer-links-wrapper">
                <div class="footer-col">
                    <h4>Product</h4>
                    <a href="#">Overview</a>
                    <a href="#">Features</a>
                    <a href="#">Pricing</a>
                    <a href="#">Download</a>
                </div>
                <div class="footer-col">
                    <h4>Company</h4>
                    <a href="#">About</a>
                    <a href="#">Careers</a>
                    <a href="#">Developer spotlight</a>
                    <a href="#">Terms</a>
                    <a href="#">Privacy Policy</a>
                </div>
                <div class="footer-col">
                    <h4>Resources</h4>
                    <a href="#">Help Center</a>
                    <a href="#">Privacy & Security</a>
                    <a href="#">Country Leaderboard</a>
                    <a href="#">Wafrly for Employers</a>
                    <a href="#">Changelog</a>
                </div>
                <div class="footer-col">
                    <h4>Social</h4>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                    <a href="#">Email</a>
                </div>
            </div>
        </div>

        <!-- Floating Category Pills -->
        <div class="footer-pills-container">
            <div class="pill-track">
                <div class="floating-pill pink" style="--rot: -45deg; --pos: 20%;">
                    <span>🧸</span> BABY
                </div>
                <div class="floating-pill red" style="--rot: -15deg; --pos: 32%;">
                    <span>🍎</span> GROCERIES
                </div>
                <div class="floating-pill gray" style="--rot: 20deg; --pos: 42%;">
                    <span>🪩</span> DANCING
                </div>
                <div class="floating-pill purple" style="--rot: 5deg; --pos: 53%;">
                    <span>🍸</span> DATE NIGHT
                </div>
                <div class="floating-pill orange" style="--rot: -35deg; --pos: 66%;">
                    <span>🏠</span> HOME
                </div>
                <div class="floating-pill green" style="--rot: 10deg; --pos: 78%;">
                    <span>⛰️</span> HIKING
                </div>
                <div class="floating-pill orange-light" style="--rot: 25deg; --pos: 90%;">
                    <span>👫</span> WEDDING
                </div>
            </div>
        </div>
    </footer>
    `;
};
