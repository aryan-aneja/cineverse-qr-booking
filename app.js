
// Main application file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize event listeners
    initEventListeners();
    
    // Check for existing elements and create if needed
    ensureRequiredElements();
    
    // Initialize movie data
    initMovieData();
    
    // Generate random booking ID for tickets
    generateBookingId();
});

// Movie data
const movieData = {
    movie1: {
        title: "Interstellar",
        language: "English",
        genre: "Sci-Fi, Adventure",
        certificate: "U/A"
    },
    movie2: {
        title: "Jawan",
        language: "Hindi",
        genre: "Action, Thriller",
        certificate: "U/A"
    },
    movie3: {
        title: "Oppenheimer",
        language: "English",
        genre: "Drama, Biography",
        certificate: "A"
    },
    movie4: {
        title: "RRR",
        language: "Telugu",
        genre: "Action, Drama",
        certificate: "U/A"
    },
    movie5: {
        title: "Inception",
        language: "English",
        genre: "Sci-Fi, Action",
        certificate: "U/A"
    },
    movie6: {
        title: "Pathaan",
        language: "Hindi",
        genre: "Action, Thriller",
        certificate: "U/A"
    },
    movie7: {
        title: "KGF Chapter 2",
        language: "Kannada",
        genre: "Action, Drama",
        certificate: "U/A"
    },
    movie8: {
        title: "Barbie",
        language: "English",
        genre: "Comedy, Fantasy",
        certificate: "U"
    },
    movie9: {
        title: "Brahmastra",
        language: "Hindi",
        genre: "Fantasy, Adventure",
        certificate: "U/A"
    },
    movie10: {
        title: "Dune",
        language: "English",
        genre: "Sci-Fi, Adventure",
        certificate: "U/A"
    },
    movie11: {
        title: "Kantara",
        language: "Kannada",
        genre: "Drama, Thriller",
        certificate: "U/A"
    },
    movie12: {
        title: "Avatar: The Way of Water",
        language: "English",
        genre: "Sci-Fi, Adventure",
        certificate: "U/A"
    },
    movie13: {
        title: "Animal",
        language: "Hindi",
        genre: "Crime, Drama",
        certificate: "A"
    },
    movie14: {
        title: "Top Gun: Maverick",
        language: "English",
        genre: "Action, Drama",
        certificate: "U/A"
    }
};

// Initialize movie data in local storage
function initMovieData() {
    if (!localStorage.getItem('movieData')) {
        localStorage.setItem('movieData', JSON.stringify(movieData));
    }
}

// Initialize event listeners
function initEventListeners() {
    // Location dropdown toggle
    const locationBtn = document.getElementById('locationBtn');
    const locationDropdown = document.getElementById('locationDropdown');
    
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            locationDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        window.addEventListener('click', function(event) {
            if (!event.target.matches('#locationBtn') && !event.target.closest('#locationBtn')) {
                if (locationDropdown.classList.contains('show')) {
                    locationDropdown.classList.remove('show');
                }
            }
        });
    }
    
    // Location selection
    const locationItems = document.querySelectorAll('.location-item');
    locationItems.forEach(item => {
        item.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            document.getElementById('selectedLocation').textContent = location;
            locationDropdown.classList.remove('show');
        });
    });
    
    // Movie filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter movies
            const movieCards = document.querySelectorAll('.movie-card');
            movieCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-lang') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Coming Soon slider navigation
    const sliderPrev = document.querySelector('.slider-nav.prev');
    const sliderNext = document.querySelector('.slider-nav.next');
    const sliderContainer = document.querySelector('.slider-container');
    
    if (sliderPrev && sliderNext && sliderContainer) {
        sliderPrev.addEventListener('click', function() {
            sliderContainer.scrollBy({ left: -320, behavior: 'smooth' });
        });
        
        sliderNext.addEventListener('click', function() {
            sliderContainer.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }
    
    // Sign In Modal
    const signInBtn = document.getElementById('signInBtn');
    const signInModal = document.getElementById('signInModal');
    const closeModal = document.querySelectorAll('.close-modal');
    
    if (signInBtn && signInModal) {
        signInBtn.addEventListener('click', function() {
            signInModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal functionality
    closeModal.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Auth tabs functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            const authForms = document.querySelectorAll('.auth-form');
            authForms.forEach(form => {
                form.classList.remove('active');
            });
            
            document.querySelector(`.${tabName}-form`).classList.add('active');
        });
    });
    
    // Password toggle functionality
    const togglePassword = document.querySelectorAll('.toggle-password');
    togglePassword.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Password strength meter
    const signUpPassword = document.getElementById('signUpPassword');
    if (signUpPassword) {
        signUpPassword.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
    
    // Book tickets functionality
    const bookTicketBtns = document.querySelectorAll('.btn-book');
    bookTicketBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const movieId = this.getAttribute('data-id');
            openBookingModal(movieId);
        });
    });
    
    // Date selection in booking
    const dateItems = document.querySelectorAll('.date-item');
    dateItems.forEach(item => {
        item.addEventListener('click', function() {
            dateItems.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
            checkDateTimeSelection();
        });
    });
    
    // Time selection in booking
    const timeBtns = document.querySelectorAll('.time-btn');
    timeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            timeBtns.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            checkDateTimeSelection();
        });
    });
    
    // Step navigation in booking
    const nextStepBtns = document.querySelectorAll('.next-step');
    nextStepBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-next');
            if (nextStep === 'step2') {
                document.getElementById('step1').style.display = 'none';
                document.getElementById('step2').style.display = 'block';
            } else if (nextStep === 'step3') {
                document.getElementById('step2').style.display = 'none';
                document.getElementById('step3').style.display = 'block';
                updateSummary();
            }
        });
    });
    
    const prevStepBtns = document.querySelectorAll('.prev-step');
    prevStepBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-prev');
            if (prevStep === 'step1') {
                document.getElementById('step2').style.display = 'none';
                document.getElementById('step1').style.display = 'block';
            } else if (prevStep === 'step2') {
                document.getElementById('step3').style.display = 'none';
                document.getElementById('step2').style.display = 'block';
            }
        });
    });
    
    // Seat selection
    const seats = document.querySelectorAll('.seat:not(.booked)');
    seats.forEach(seat => {
        seat.addEventListener('click', function() {
            this.classList.toggle('selected');
            updateSelectedSeats();
        });
    });
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.getAttribute('data-method');
            
            // Update active state
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            const paymentForms = document.querySelectorAll('.payment-form');
            paymentForms.forEach(form => {
                form.style.display = 'none';
            });
            
            document.getElementById(`${methodType}-payment`).style.display = 'block';
        });
    });
    
    // Confirm payment
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', function() {
            showBookingConfirmation();
        });
    }
    
    // Close ticket and download functionality
    const closeTicketBtn = document.getElementById('closeTicketBtn');
    if (closeTicketBtn) {
        closeTicketBtn.addEventListener('click', function() {
            const bookingModal = document.getElementById('bookingModal');
            bookingModal.classList.remove('show');
            document.body.style.overflow = '';
            
            // Reset booking flow
            setTimeout(() => {
                document.getElementById('step4').style.display = 'none';
                document.getElementById('step1').style.display = 'block';
                resetBookingForm();
            }, 300);
        });
    }
    
    const downloadTicketBtn = document.getElementById('downloadTicketBtn');
    if (downloadTicketBtn) {
        downloadTicketBtn.addEventListener('click', function() {
            alert('Ticket download functionality would be implemented here!');
        });
    }
}

// Make sure required elements are present
function ensureRequiredElements() {
    const savedTickets = localStorage.getItem('savedTickets');
    if (savedTickets) {
        // Implementation would go here if needed
    }
}

// Generate random booking ID
function generateBookingId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let bookingId = 'CIN';
    for (let i = 0; i < 7; i++) {
        bookingId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return bookingId;
}

// Update password strength meter
function updatePasswordStrength(password) {
    const strength = calculatePasswordStrength(password);
    const strengthProgress = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');
    
    strengthProgress.style.width = strength + '%';
    
    if (strength < 30) {
        strengthProgress.style.backgroundColor = '#ff6b6b';
        strengthText.textContent = 'Weak';
    } else if (strength < 60) {
        strengthProgress.style.backgroundColor = '#ffda6b';
        strengthText.textContent = 'Medium';
    } else {
        strengthProgress.style.backgroundColor = '#6bff6b';
        strengthText.textContent = 'Strong';
    }
}

// Calculate password strength
function calculatePasswordStrength(password) {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    
    // Contains lowercase
    if (password.match(/[a-z]/)) strength += 15;
    
    // Contains uppercase
    if (password.match(/[A-Z]/)) strength += 15;
    
    // Contains numbers
    if (password.match(/[0-9]/)) strength += 15;
    
    // Contains special chars
    if (password.match(/[^a-zA-Z0-9]/)) strength += 15;
    
    // Variety of characters
    const uniqueChars = new Set(password).size;
    strength += Math.min(uniqueChars / password.length * 10, 10);
    
    return Math.min(strength, 100);
}

// Open booking modal
function openBookingModal(movieId) {
    const bookingModal = document.getElementById('bookingModal');
    const movieData = JSON.parse(localStorage.getItem('movieData'));
    const movie = movieData[movieId];
    
    if (movie) {
        document.getElementById('selectedMovieTitle').textContent = movie.title;
        document.getElementById('movieLanguage').textContent = movie.language;
        document.getElementById('movieGenre').textContent = movie.genre;
        document.getElementById('movieCertificate').textContent = movie.certificate;
        
        // Reset booking state
        resetBookingForm();
        
        // Show modal
        bookingModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Reset booking form
function resetBookingForm() {
    // Reset date and time selections
    document.querySelectorAll('.date-item').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.time-btn').forEach(t => t.classList.remove('active'));
    
    // Reset seat selections
    document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
    document.getElementById('selectedSeatsLabel').textContent = 'None';
    document.getElementById('subtotalAmount').textContent = '₹0';
    document.getElementById('convenienceFee').textContent = '₹0';
    document.getElementById('totalAmount').textContent = '₹0';
    
    // Reset next button
    document.querySelector('.next-step[data-next="step2"]').disabled = true;
    document.querySelector('.next-step[data-next="step3"]').disabled = true;
}

// Check if date and time are selected
function checkDateTimeSelection() {
    const dateSelected = document.querySelector('.date-item.active');
    const timeSelected = document.querySelector('.time-btn.active');
    
    const nextBtn = document.querySelector('.next-step[data-next="step2"]');
    if (dateSelected && timeSelected) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

// Update selected seats information
function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const seatsList = Array.from(selectedSeats).map(seat => seat.getAttribute('data-seat')).join(', ');
    
    let normalCount = document.querySelectorAll('.seat.selected:not(.premium)').length;
    let premiumCount = document.querySelectorAll('.seat.premium.selected').length;
    
    const subtotal = (normalCount * 250) + (premiumCount * 350);
    const convenienceFee = Math.round(subtotal * 0.05); // 5% convenience fee
    const total = subtotal + convenienceFee;
    
    document.getElementById('selectedSeatsLabel').textContent = seatsList || 'None';
    document.getElementById('subtotalAmount').textContent = `₹${subtotal}`;
    document.getElementById('convenienceFee').textContent = `₹${convenienceFee}`;
    document.getElementById('totalAmount').textContent = `₹${total}`;
    
    const nextBtn = document.querySelector('.next-step[data-next="step3"]');
    if (selectedSeats.length > 0) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

// Update booking summary
function updateSummary() {
    const movieTitle = document.getElementById('selectedMovieTitle').textContent;
    const selectedLocation = document.getElementById('selectedLocation').textContent;
    const selectedDate = document.querySelector('.date-item.active');
    const selectedTime = document.querySelector('.time-btn.active');
    const selectedSeats = document.getElementById('selectedSeatsLabel').textContent;
    const totalAmount = document.getElementById('totalAmount').textContent;
    
    // Format date
    const dateText = selectedDate.querySelector('.month').textContent;
    const dateNum = selectedDate.querySelector('.date').textContent;
    
    // Update summary
    document.getElementById('summaryMovie').textContent = movieTitle;
    document.getElementById('summaryTheater').textContent = `CineVerse IMAX (${selectedLocation})`;
    document.getElementById('summaryDateTime').textContent = `${dateNum} ${dateText}, ${selectedTime.textContent}`;
    document.getElementById('summarySeats').textContent = selectedSeats;
    document.getElementById('summaryAmount').textContent = totalAmount;
    document.getElementById('qrAmount').textContent = totalAmount;
}

// Show booking confirmation
function showBookingConfirmation() {
    // Hide step 3
    document.getElementById('step3').style.display = 'none';
    
    // Show step 4
    document.getElementById('step4').style.display = 'block';
    
    // Update ticket details
    const movieTitle = document.getElementById('selectedMovieTitle').textContent;
    const movieLanguage = document.getElementById('movieLanguage').textContent;
    const movieCertificate = document.getElementById('movieCertificate').textContent;
    const selectedLocation = document.getElementById('selectedLocation').textContent;
    const selectedSeats = document.getElementById('selectedSeatsLabel').textContent;
    
    // Get date and time
    const selectedDate = document.querySelector('.date-item.active');
    const dateText = selectedDate.querySelector('.month').textContent;
    const dateNum = selectedDate.querySelector('.date').textContent;
    
    const selectedTime = document.querySelector('.time-btn.active').textContent;
    
    // Update ticket
    document.getElementById('ticketBookingId').textContent = generateBookingId();
    document.getElementById('ticketMovie').textContent = movieTitle;
    document.getElementById('ticketLanguage').textContent = `${movieLanguage} • ${movieCertificate}`;
    document.getElementById('ticketDateTime').textContent = `${dateNum} ${dateText}, ${selectedTime}`;
    document.getElementById('ticketVenue').textContent = `CineVerse IMAX (${selectedLocation})`;
    document.getElementById('ticketSeats').textContent = selectedSeats;
    
    // Save ticket to local storage (simplified implementation)
    const ticketData = {
        bookingId: document.getElementById('ticketBookingId').textContent,
        movie: movieTitle,
        language: movieLanguage,
        certificate: movieCertificate,
        date: `${dateNum} ${dateText}`,
        time: selectedTime,
        venue: `CineVerse IMAX (${selectedLocation})`,
        seats: selectedSeats
    };
    
    // Store in local storage
    let savedTickets = JSON.parse(localStorage.getItem('savedTickets')) || [];
    savedTickets.push(ticketData);
    localStorage.setItem('savedTickets', JSON.stringify(savedTickets));
}
