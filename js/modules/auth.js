
// Authentication module
const Auth = (() => {
    let currentUser = null;
    
    // DOM elements
    const initAuthElements = () => {
        setupEventListeners();
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
                
                // Basic validation
                if (!email || !password) {
                    alert('Please fill in all fields');
                    return;
                }
                
                // Mock sign in (in a real app, this would call an API)
                alert('Sign in successful!');
                if (signInModal) {
                    signInModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
                
                // Update UI to show logged in state (simplified for this example)
                if (signInBtn) {
                    signInBtn.textContent = 'My Account';
                }
                
                // Save user info
                currentUser = { email };
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
                const signInTab = document.querySelector('[data-tab="signIn"]');
                if (signInTab) {
                    signInTab.click();
                }
                
                // Save user info
                currentUser = { name, email };
            });
        }
    };
    
    return {
        initAuthElements,
        getCurrentUser: () => currentUser
    };
})();

export default Auth;
