
// Authentication module
const Auth = (() => {
    let currentUser = null;
    
    // DOM elements
    const initAuthElements = () => {
        // Initialize elements only after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            checkExistingUser();
            setupEventListeners();
            setupSearch();
        });
    };
    
    // Check if a user is already logged in
    const checkExistingUser = () => {
        try {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                updateUIForLoggedInUser();
            }
        } catch (e) {
            console.error('Error checking existing user:', e);
        }
    };
    
    const updateUIForLoggedInUser = () => {
        if (!currentUser) return;
        
        const signInBtn = document.getElementById('signInBtn');
        if (signInBtn) {
            signInBtn.textContent = `Welcome, ${currentUser.name}`;
            
            // Remove existing logout button if it exists
            const existingLogoutBtn = document.getElementById('logoutBtn');
            if (existingLogoutBtn) {
                existingLogoutBtn.remove();
            }
            
            // Add logout option
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logoutBtn';
            logoutBtn.className = 'btn btn-outline';
            logoutBtn.textContent = 'Logout';
            logoutBtn.addEventListener('click', logout);
            
            // Insert logout button after sign in button
            signInBtn.parentNode.insertBefore(logoutBtn, signInBtn.nextSibling);
        }
    };
    
    const logout = () => {
        localStorage.removeItem('currentUser');
        currentUser = null;
        
        // Update UI
        const signInBtn = document.getElementById('signInBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (signInBtn) {
            signInBtn.textContent = 'Sign In';
        }
        
        if (logoutBtn) {
            logoutBtn.remove();
        }
        
        alert('You have been logged out.');
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
                if (currentUser) {
                    // User is already signed in, do nothing or show profile
                    return;
                }
                
                if (signInModal) {
                    signInModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                } else {
                    // Create modal if it doesn't exist
                    createSignInModal();
                }
            });
        } else {
            // Create button if it doesn't exist
            createSignInButton();
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            const modal = document.getElementById('signInModal');
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    };
    
    const createSignInButton = () => {
        const header = document.querySelector('header') || document.body.firstChild;
        const signInBtn = document.createElement('button');
        signInBtn.id = 'signInBtn';
        signInBtn.className = 'btn btn-primary';
        signInBtn.textContent = 'Sign In';
        
        // Check if user is already signed in
        if (currentUser) {
            signInBtn.textContent = `Welcome, ${currentUser.name}`;
        }
        
        // Add button to header or body
        if (header) {
            const nav = header.querySelector('nav') || header;
            nav.appendChild(signInBtn);
            
            // Add logout button if user is signed in
            if (currentUser) {
                const logoutBtn = document.createElement('button');
                logoutBtn.id = 'logoutBtn';
                logoutBtn.className = 'btn btn-outline';
                logoutBtn.textContent = 'Logout';
                logoutBtn.addEventListener('click', logout);
                nav.appendChild(logoutBtn);
            }
        } else {
            // Create a simple header if none exists
            const newHeader = document.createElement('header');
            newHeader.className = 'site-header';
            newHeader.appendChild(signInBtn);
            
            // Add logout button if user is signed in
            if (currentUser) {
                const logoutBtn = document.createElement('button');
                logoutBtn.id = 'logoutBtn';
                logoutBtn.className = 'btn btn-outline';
                logoutBtn.textContent = 'Logout';
                logoutBtn.addEventListener('click', logout);
                newHeader.appendChild(logoutBtn);
            }
            
            document.body.insertBefore(newHeader, document.body.firstChild);
        }
        
        // Attach event listener
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentUser) {
                // User is already signed in, do nothing or show profile
                return;
            }
            
            const modal = document.getElementById('signInModal');
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                createSignInModal();
            }
        });
    };
    
    const createSignInModal = () => {
        // Remove existing modal if it exists
        const existingModal = document.getElementById('signInModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.id = 'signInModal';
        modal.className = 'modal';
        
        modal.innerHTML = `
            <div class="modal-content auth-modal">
                <span class="close">&times;</span>
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="signIn">Sign In</button>
                    <button class="auth-tab" data-tab="signUp">Sign Up</button>
                </div>
                
                <div class="auth-forms">
                    <form id="signInForm" class="auth-form active">
                        <div class="form-group">
                            <label for="signInEmail">Email Address</label>
                            <input type="email" id="signInEmail" required placeholder="Enter your email">
                        </div>
                        <div class="form-group">
                            <label for="signInPassword">Password</label>
                            <div class="password-input">
                                <input type="password" id="signInPassword" required placeholder="Enter your password">
                                <i class="toggle-password fa fa-eye"></i>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                        </div>
                        <div class="form-error" id="signInError"></div>
                    </form>
                    
                    <form id="signUpForm" class="auth-form">
                        <div class="form-group">
                            <label for="signUpName">Full Name</label>
                            <input type="text" id="signUpName" required placeholder="Enter your name">
                        </div>
                        <div class="form-group">
                            <label for="signUpEmail">Email Address</label>
                            <input type="email" id="signUpEmail" required placeholder="Enter your email">
                        </div>
                        <div class="form-group">
                            <label for="signUpPhone">Phone Number</label>
                            <input type="tel" id="signUpPhone" required placeholder="Enter your phone number">
                        </div>
                        <div class="form-group">
                            <label for="signUpPassword">Password</label>
                            <div class="password-input">
                                <input type="password" id="signUpPassword" required placeholder="Create a password">
                                <i class="toggle-password fa fa-eye"></i>
                            </div>
                            <div class="password-strength-meter">
                                <div class="strength-bar">
                                    <div id="passwordStrength" class="strength-bar-progress"></div>
                                </div>
                                <span id="strengthText" class="strength-text">Weak</span>
                            </div>
                        </div>
                        <div class="form-group checkbox-group">
                            <input type="checkbox" id="termsConditions">
                            <label for="termsConditions">I agree to the Terms & Conditions</label>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block">Create Account</button>
                        </div>
                        <div class="form-error" id="signUpError"></div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add close button functionality
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Setup the auth tabs, password toggles, and form submissions for the new modal
        setupAuthTabs();
        setupPasswordToggle();
        setupPasswordStrength();
        setupFormSubmissions();
        
        // Show the modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
    
    const setupAuthTabs = () => {
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
    };
    
    const setupPasswordToggle = () => {
        // Toggle password visibility
        const togglePasswordButtons = document.querySelectorAll('.toggle-password');
        togglePasswordButtons.forEach(button => {
            if (!button) return;
            
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
    };
    
    const setupPasswordStrength = () => {
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
    };
    
    const setupFormSubmissions = () => {
        // Form Submissions with validation
        const signInForm = document.getElementById('signInForm');
        if (signInForm) {
            signInForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Clear previous errors
                const errorEl = document.getElementById('signInError');
                if (errorEl) errorEl.textContent = '';
                
                const email = document.getElementById('signInEmail')?.value;
                const password = document.getElementById('signInPassword')?.value;
                
                // Enhanced validation
                if (!email || !password) {
                    if (errorEl) errorEl.textContent = 'Please fill in all fields';
                    return;
                }
                
                if (!validateEmail(email)) {
                    if (errorEl) errorEl.textContent = 'Please enter a valid email address';
                    return;
                }
                
                // Get users from localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    const signInModal = document.getElementById('signInModal');
                    
                    if (signInModal) {
                        signInModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                    
                    // Save user info
                    currentUser = { email: user.email, name: user.name };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    
                    // Update UI
                    updateUIForLoggedInUser();
                    
                    alert('Sign in successful!');
                } else {
                    if (errorEl) errorEl.textContent = 'Invalid email or password';
                }
            });
        }
        
        const signUpForm = document.getElementById('signUpForm');
        if (signUpForm) {
            signUpForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Clear previous errors
                const errorEl = document.getElementById('signUpError');
                if (errorEl) errorEl.textContent = '';
                
                const name = document.getElementById('signUpName')?.value;
                const email = document.getElementById('signUpEmail')?.value;
                const phone = document.getElementById('signUpPhone')?.value;
                const password = document.getElementById('signUpPassword')?.value;
                const terms = document.getElementById('termsConditions')?.checked;
                
                // Enhanced validation
                if (!name || !email || !phone || !password) {
                    if (errorEl) errorEl.textContent = 'Please fill in all fields';
                    return;
                }
                
                if (!validateEmail(email)) {
                    if (errorEl) errorEl.textContent = 'Please enter a valid email address';
                    return;
                }
                
                if (!validatePassword(password)) {
                    if (errorEl) errorEl.textContent = 'Password must be at least 6 characters long';
                    return;
                }
                
                if (!terms) {
                    if (errorEl) errorEl.textContent = 'Please agree to the Terms & Conditions';
                    return;
                }
                
                // Store user in localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Check if user already exists
                if (users.some(user => user.email === email)) {
                    if (errorEl) errorEl.textContent = 'Email already registered';
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
        // First, check if search exists, if not create it
        let searchInput = document.getElementById('movieSearch');
        if (!searchInput) {
            createSearchBar();
            searchInput = document.getElementById('movieSearch');
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const movieCards = document.querySelectorAll('.movie-card');
                
                if (movieCards.length === 0) {
                    console.log('No movie cards found to search');
                    return;
                }
                
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
    
    // Create a search bar if it doesn't exist
    const createSearchBar = () => {
        const mainSection = document.querySelector('main') || document.body;
        const existingSearch = document.getElementById('movieSearch');
        
        if (!existingSearch) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            searchContainer.innerHTML = `
                <div class="search-wrapper">
                    <input type="text" id="movieSearch" placeholder="Search for movies by title, genre, or language">
                    <button class="search-btn">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            `;
            
            // Insert before the first child or append
            if (mainSection.firstChild) {
                mainSection.insertBefore(searchContainer, mainSection.firstChild);
            } else {
                mainSection.appendChild(searchContainer);
            }
        }
    };
    
    // Additional styles for error messages
    const addStyles = () => {
        const existingStyle = document.getElementById('auth-styles');
        if (existingStyle) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'auth-styles';
        styleElement.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            .modal-content {
                background-color: #fff;
                margin: 10% auto;
                padding: 20px;
                border-radius: 5px;
                width: 90%;
                max-width: 500px;
                position: relative;
            }
            
            .close {
                position: absolute;
                right: 20px;
                top: 10px;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .auth-tabs {
                display: flex;
                margin-bottom: 20px;
                border-bottom: 1px solid #ddd;
            }
            
            .auth-tab {
                padding: 10px 20px;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 16px;
                opacity: 0.7;
            }
            
            .auth-tab.active {
                opacity: 1;
                border-bottom: 2px solid #9b87f5;
            }
            
            .auth-form {
                display: none;
            }
            
            .auth-form.active {
                display: block;
            }
            
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
            }
            
            .form-group input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            
            .password-input {
                position: relative;
            }
            
            .toggle-password {
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
            }
            
            .btn {
                padding: 10px 15px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            
            .btn-primary {
                background-color: #9b87f5;
                color: white;
            }
            
            .btn-outline {
                background-color: transparent;
                border: 1px solid #9b87f5;
                color: #9b87f5;
                margin-left: 10px;
            }
            
            .btn-block {
                width: 100%;
            }
            
            .checkbox-group {
                display: flex;
                align-items: center;
            }
            
            .checkbox-group input {
                width: auto;
                margin-right: 10px;
            }
            
            .password-strength-meter {
                margin-top: 5px;
            }
            
            .strength-bar {
                height: 5px;
                background-color: #eee;
                border-radius: 3px;
                margin-bottom: 5px;
            }
            
            .strength-bar-progress {
                height: 100%;
                width: 0;
                border-radius: 3px;
                transition: width 0.3s, background-color 0.3s;
            }
            
            .search-container {
                margin: 20px auto;
                max-width: 800px;
                padding: 0 15px;
            }
            
            .search-wrapper {
                display: flex;
                position: relative;
            }
            
            #movieSearch {
                width: 100%;
                padding: 12px 50px 12px 15px;
                border: 2px solid #9b87f5;
                border-radius: 25px;
                font-size: 16px;
            }
            
            .search-btn {
                position: absolute;
                right: 5px;
                top: 5px;
                background-color: #9b87f5;
                color: white;
                border: none;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .form-error {
                color: #e74c3c;
                margin-top: 10px;
                font-size: 14px;
            }
        `;
        
        document.head.appendChild(styleElement);
    };
    
    // Initialize
    addStyles();
    
    return {
        initAuthElements,
        getCurrentUser: () => currentUser,
        downloadTicket: (ticketData) => {
            // Create a mock QR code if not provided
            const safeBookingId = encodeURIComponent(ticketData.bookingId);
            const qrCode = ticketData.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${safeBookingId}`;
            
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
                            <img src="${qrCode}" alt="Ticket QR Code" width="150" height="150">
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
            downloadLink.download = `CineVerse_Ticket_${safeBookingId}.html`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(downloadUrl);
        }
    };
})();

export default Auth;
