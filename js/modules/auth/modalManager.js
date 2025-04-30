
// Modal Manager module for handling auth modals
const ModalManager = (userAuth) => {
    // Create sign in modal if it doesn't exist
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
        
        // Return the created modal
        return modal;
    };
    
    // Setup auth tabs functionality
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
    
    // Setup password toggle functionality
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
    
    // Setup password strength meter
    const setupPasswordStrength = () => {
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
    
    // Setup form submissions
    const setupFormSubmissions = (updateUICallback, closeModalCallback) => {
        const signInForm = document.getElementById('signInForm');
        if (signInForm) {
            signInForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Clear previous errors
                const errorEl = document.getElementById('signInError');
                if (errorEl) errorEl.textContent = '';
                
                const email = document.getElementById('signInEmail')?.value;
                const password = document.getElementById('signInPassword')?.value;
                
                const result = userAuth.processSignIn(email, password);
                
                if (result.success) {
                    // Close modal
                    closeModalCallback('signInModal');
                    
                    // Update UI
                    updateUICallback(result.user);
                    
                    alert('Sign in successful!');
                } else {
                    if (errorEl) errorEl.textContent = result.error || 'Invalid email or password';
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
                
                const result = userAuth.processSignUp(name, email, phone, password, terms);
                
                if (result.success) {
                    alert('Account created successfully! Please sign in.');
                    
                    // Switch to Sign In tab
                    const signInTab = document.querySelector('[data-tab="signIn"]');
                    if (signInTab) {
                        signInTab.click();
                    }
                } else {
                    if (errorEl) errorEl.textContent = result.error || 'Registration failed';
                }
            });
        }
    };
    
    // Initialize the modal and all its functionality
    const initializeModal = (updateUICallback, closeModalCallback) => {
        const modal = createSignInModal();
        
        // Add close button functionality
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closeModalCallback('signInModal');
            });
        }
        
        // Setup all modal functionality
        setupAuthTabs();
        setupPasswordToggle();
        setupPasswordStrength();
        setupFormSubmissions(updateUICallback, closeModalCallback);
        
        // Show the modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        return modal;
    };
    
    return {
        createSignInModal,
        initializeModal
    };
};

export default ModalManager;
