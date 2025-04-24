// Authentication module
const Auth = (() => {
    let currentUser = null;
    
    // DOM elements
    const initAuthElements = () => {
        setupEventListeners();
        setupSearch();
    };
    
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    const validatePassword = (password) => {
        return password.length >= 6;
    };
    
    const setupEventListeners = () => {
        // Sign In button functionality
        const signInBtn = document.getElementById('signInBtn');
        const signInModal = document.getElementById('signInModal');
        
        if (signInBtn) {
            signInBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (signInModal) {
                    signInModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        }
        
        // Auth tabs functionality
        const authTabs = document.querySelectorAll('.auth-tab');
        const authForms = document.querySelectorAll('.auth-form');
        
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                authTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all forms
                authForms.forEach(form => {
                    form.classList.remove('active');
                });
                
                // Show the corresponding form
                const tabTarget = this.getAttribute('data-tab');
                const targetForm = document.getElementById(tabTarget + 'Form');
                if (targetForm) {
                    targetForm.classList.add('active');
                }
            });
        });
        
        // Toggle password visibility
        const togglePasswordButtons = document.querySelectorAll('.toggle-password');
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function() {
                const passwordInput = this.previousElementSibling;
                if (passwordInput) {
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    
                    // Toggle eye icon
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                }
            });
        });
        
        // Password strength meter
        const signUpPasswordInput = document.getElementById('signUpPassword');
        if (signUpPasswordInput) {
            signUpPasswordInput.addEventListener('input', function() {
                const password = this.value;
                const strengthProgress = document.getElementById('passwordStrength');
                const strengthText = document.getElementById('strengthText');
                
                if (!strengthProgress || !strengthText) return;
                
                // Calculate password strength
                let strength = 0;
                if (password.length > 6) strength += 20;
                if (password.length > 10) strength += 20;
                if (/[A-Z]/.test(password)) strength += 20;
                if (/[0-9]/.test(password)) strength += 20;
                if (/[^A-Za-z0-9]/.test(password)) strength += 20;
                
                // Update strength bar
                strengthProgress.style.width = strength + '%';
                
                // Update color based on strength
                if (strength < 40) {
                    strengthProgress.style.backgroundColor = '#ff6b6b';
                    strengthText.textContent = 'Weak';
                } else if (strength < 80) {
                    strengthProgress.style.backgroundColor = '#ffd93d';
                    strengthText.textContent = 'Medium';
                } else {
                    strengthProgress.style.backgroundColor = '#6bff84';
                    strengthText.textContent = 'Strong';
                }
            });
        }

        // Form Submissions with validation
        const signInForm = document.getElementById('signInForm');
        if (signInForm) {
            signInForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('signInEmail').value;
                const password = document.getElementById('signInPassword').value;
                
                // Enhanced validation
                if (!email || !password) {
                    alert('Please fill in all fields');
                    return;
                }
                
                if (!validateEmail(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // Get users from localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    const signInModal = document.getElementById('signInModal');
                    const signInBtn = document.getElementById('signInBtn');
                    
                    if (signInModal) {
                        signInModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                    
                    if (signInBtn) {
                        signInBtn.textContent = `Welcome, ${user.name}`;
                    }
                    
                    // Save user info
                    currentUser = { email: user.email, name: user.name };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    alert('Sign in successful!');
                } else {
                    alert('Invalid email or password');
                }
            });
        }
        
        const signUpForm = document.getElementById('signUpForm');
        if (signUpForm) {
            signUpForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('signUpName')?.value;
                const email = document.getElementById('signUpEmail')?.value;
                const phone = document.getElementById('signUpPhone')?.value;
                const password = document.getElementById('signUpPassword')?.value;
                const terms = document.getElementById('termsConditions')?.checked;
                
                // Enhanced validation
                if (!name || !email || !phone || !password) {
                    alert('Please fill in all fields');
                    return;
                }
                
                if (!validateEmail(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                if (!validatePassword(password)) {
                    alert('Password must be at least 6 characters long');
                    return;
                }
                
                if (!terms) {
                    alert('Please agree to the Terms & Conditions');
                    return;
                }
                
                // Store user in localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Check if user already exists
                if (users.some(user => user.email === email)) {
                    alert('Email already registered');
                    return;
                }
                
                // Add new user
                users.push({ name, email, phone, password });
                localStorage.setItem('users', JSON.stringify(users));
                
                alert('Account created successfully! Please sign in.');
                
                // Switch to Sign In tab
                const signInTab = document.querySelector('[data-tab="signIn"]');
                if (signInTab) {
                    signInTab.click();
                }
            });
        }
    };
    
    // Setup search functionality
    const setupSearch = () => {
        const searchInput = document.getElementById('movieSearch');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const movieCards = document.querySelectorAll('.movie-card');
                
                movieCards.forEach(card => {
                    const title = card.querySelector('.movie-title')?.textContent.toLowerCase() || '';
                    const genre = card.querySelector('.movie-genre')?.textContent.toLowerCase() || '';
                    const language = card.querySelector('.movie-language')?.textContent.toLowerCase() || '';
                    
                    if (title.includes(searchTerm) || genre.includes(searchTerm) || language.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    };
    
    // Ticket download functionality
    const downloadTicket = (ticketData) => {
        const ticketHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .ticket {
                        width: 800px;
                        padding: 20px;
                        border: 2px solid #333;
                        margin: 20px auto;
                    }
                    .ticket-header {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 10px;
                    }
                    .movie-title {
                        font-size: 24px;
                        color: #e84545;
                        margin-bottom: 10px;
                    }
                    .ticket-info {
                        margin: 15px 0;
                    }
                    .qr-code {
                        text-align: center;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="ticket">
                    <div class="ticket-header">
                        <h1>CineVerse</h1>
                        <div>Booking ID: ${ticketData.bookingId}</div>
                    </div>
                    <div class="movie-title">${ticketData.movie}</div>
                    <div class="ticket-info">
                        <p><strong>Date & Time:</strong> ${ticketData.date}, ${ticketData.time}</p>
                        <p><strong>Theatre:</strong> ${ticketData.theater}</p>
                        <p><strong>Seats:</strong> ${ticketData.seats}</p>
                    </div>
                    <div class="qr-code">
                        <img src="${ticketData.qrCode}" alt="Ticket QR Code" width="150" height="150">
                        <p>Scan this QR code at the entrance</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const blob = new Blob([ticketHTML], { type: 'text/html' });
        const downloadUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = `CineVerse_Ticket_${ticketData.bookingId}.html`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);
    };
    
    return {
        initAuthElements,
        getCurrentUser: () => currentUser,
        downloadTicket
    };
})();

export default Auth;
