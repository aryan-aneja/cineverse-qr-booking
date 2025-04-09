
// Main Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modules
    initAuth();
    loadMovies();
    setupEventListeners();
});

// Mock movie data
const movies = [
    {
        id: 1,
        title: "Avengers: Endgame",
        genre: "Action",
        rating: 4.8,
        duration: "3h 2m",
        image: "https://placehold.co/300x450/1a1a2e/FFFFFF?text=Avengers"
    },
    {
        id: 2,
        title: "The Lion King",
        genre: "Animation",
        rating: 4.5,
        duration: "1h 58m",
        image: "https://placehold.co/300x450/1a1a2e/FFFFFF?text=Lion+King"
    },
    {
        id: 3,
        title: "Joker",
        genre: "Drama",
        rating: 4.7,
        duration: "2h 2m",
        image: "https://placehold.co/300x450/1a1a2e/FFFFFF?text=Joker"
    },
    {
        id: 4,
        title: "Toy Story 4",
        genre: "Animation",
        rating: 4.6,
        duration: "1h 40m",
        image: "https://placehold.co/300x450/1a1a2e/FFFFFF?text=Toy+Story"
    }
];

const comingSoonMovies = [
    {
        id: 101,
        title: "Black Widow",
        genre: "Action",
        releaseDate: "Coming Soon",
        image: "https://placehold.co/300x170/1a1a2e/FFFFFF?text=Black+Widow"
    },
    {
        id: 102,
        title: "Fast & Furious 10",
        genre: "Action",
        releaseDate: "Coming Soon",
        image: "https://placehold.co/300x170/1a1a2e/FFFFFF?text=Fast+Furious"
    },
    {
        id: 103,
        title: "The Batman",
        genre: "Action",
        releaseDate: "Coming Soon",
        image: "https://placehold.co/300x170/1a1a2e/FFFFFF?text=Batman"
    },
    {
        id: 104,
        title: "Minions: Rise of Gru",
        genre: "Animation",
        releaseDate: "Coming Soon",
        image: "https://placehold.co/300x170/1a1a2e/FFFFFF?text=Minions"
    }
];

// Authentication module
function initAuth() {
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
            
            // Update UI to show logged in state
            if (signInBtn) {
                signInBtn.textContent = 'My Account';
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
        });
    }
}

// Load movies into the UI
function loadMovies() {
    const movieList = document.getElementById('movieList');
    const comingSoonSlider = document.getElementById('comingSoonSlider');
    
    if (movieList) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <div class="movie-poster">
                    <img src="${movie.image}" alt="${movie.title}">
                    <div class="movie-rating">
                        <i class="fas fa-star"></i>
                        <span>${movie.rating}</span>
                    </div>
                </div>
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.genre} | ${movie.duration}</p>
                    <button class="btn btn-primary btn-book">Book Now</button>
                </div>
            `;
            movieList.appendChild(movieCard);
        });
    }
    
    if (comingSoonSlider) {
        comingSoonMovies.forEach(movie => {
            const sliderItem = document.createElement('div');
            sliderItem.className = 'slider-item';
            sliderItem.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <div class="slider-info">
                    <h4>${movie.title}</h4>
                    <p>${movie.releaseDate}</p>
                </div>
            `;
            comingSoonSlider.appendChild(sliderItem);
        });
    }
}

// Set up common event listeners
function setupEventListeners() {
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would filter the movies based on the selected genre
            // For now, we'll just show all movies
        });
    });
    
    // Slider navigation
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    const sliderContainer = document.querySelector('.slider-container');
    
    if (prevButton && nextButton && sliderContainer) {
        nextButton.addEventListener('click', function() {
            sliderContainer.scrollBy({ left: 320, behavior: 'smooth' });
        });
        
        prevButton.addEventListener('click', function() {
            sliderContainer.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }
}

// Modal functionality
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside of them
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
