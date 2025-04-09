
// Authentication module
const Auth = (() => {
    let currentUser = null;
    
    // DOM elements
    const initAuthElements = () => {
        const signInBtn = document.getElementById('signInBtn');
        const signInModal = document.getElementById('signInModal');
        const authTabs = document.querySelectorAll('.auth-tab');
        const authForms = document.querySelectorAll('.auth-form');
        const togglePasswordButtons = document.querySelectorAll('.toggle-password');
        const signUpPasswordInput = document.getElementById('signUpPassword');
        
        setupEventListeners();
    };
    
    const setupEventListeners = () => {
        // Sign In button functionality
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
                document.getElementById(tabTarget + 'Form').classList.add('active');
            });
        });
        
        // Toggle password visibility
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function() {
                const passwordInput = this.previousElementSibling;
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Toggle eye icon
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        });
        
        // Password strength meter
        if (signUpPasswordInput) {
            signUpPasswordInput.addEventListener('input', function() {
                const password = this.value;
                const strengthProgress = document.getElementById('passwordStrength');
                const strengthText = document.getElementById('strengthText');
                
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
        const signInForm = document.querySelector('.sign-in-form');
        if (signInForm) {
            signInForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('signInEmail').value;
                const password = document.getElementById('signInPassword').value;
                
                // Basic validation
                if (!email || !password) {
                    alert('Please fill in all fields');
                    return;
                }
                
                // Mock sign in (in a real app, this would call an API)
                alert('Sign in successful!');
                signInModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Update UI to show logged in state (simplified for this example)
                if (signInBtn) {
                    signInBtn.textContent = 'My Account';
                }
            });
        }
        
        const signUpForm = document.querySelector('.sign-up-form');
        if (signUpForm) {
            signUpForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('signUpName').value;
                const email = document.getElementById('signUpEmail').value;
                const phone = document.getElementById('signUpPhone').value;
                const password = document.getElementById('signUpPassword').value;
                const terms = document.getElementById('termsConditions').checked;
                
                // Basic validation
                if (!name || !email || !phone || !password) {
                    alert('Please fill in all fields');
                    return;
                }
                
                if (!terms) {
                    alert('Please agree to the Terms & Conditions');
                    return;
                }
                
                // Mock sign up (in a real app, this would call an API)
                alert('Account created successfully! Please check your email to verify your account.');
                
                // Switch to Sign In tab after successful signup
                document.querySelector('[data-tab="signIn"]').click();
            });
        }
    };
    
    return {
        initAuthElements,
        getCurrentUser: () => currentUser
    };
})();

export default Auth;
