
document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let selectedMovie = null;
    let selectedDate = null;
    let selectedTime = null;
    let selectedTheater = null;
    let selectedSeats = [];
    let ticketPrice = {
        normal: 250,
        premium: 350
    };

    // DOM elements
    const bookingModal = document.getElementById('bookingModal');
    const signInModal = document.getElementById('signInModal');
    const signInBtn = document.getElementById('signInBtn');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const movieCards = document.querySelectorAll('.movie-card');
    const bookTicketButtons = document.querySelectorAll('.btn-book');
    const dateItems = document.querySelectorAll('.date-item');
    const timeButtons = document.querySelectorAll('.time-btn');
    const seats = document.querySelectorAll('.seat:not(.booked)');
    const nextStepButtons = document.querySelectorAll('.next-step');
    const prevStepButtons = document.querySelectorAll('.prev-step');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    const downloadTicketBtn = document.getElementById('downloadTicketBtn');
    const closeTicketBtn = document.getElementById('closeTicketBtn');
    const showSignUpLink = document.getElementById('showSignUpLink');
    const sliderNavButtons = document.querySelectorAll('.slider-nav');

    // Event listeners for opening modals
    signInBtn.addEventListener('click', function() {
        signInModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Book tickets buttons
    bookTicketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const movieId = this.getAttribute('data-id');
            const movieCard = this.closest('.movie-card');
            const movieTitle = movieCard.querySelector('h3').textContent;
            const movieInfo = movieCard.querySelector('p').textContent;
            
            // Set movie information in booking modal
            document.getElementById('selectedMovieTitle').textContent = movieTitle;
            document.getElementById('movieLanguage').textContent = movieInfo.split('•')[0].trim();
            document.getElementById('movieGenre').textContent = movieInfo.split('•')[1].trim();
            
            // Reset booking form
            resetBookingForm();
            
            // Open booking modal
            bookingModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Set selected movie
            selectedMovie = movieTitle;
        });
    });

    // Close modal buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === bookingModal) {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === signInModal) {
            signInModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Filter buttons for movies
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter movies
            movieCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-lang') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Date selector
    dateItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all dates
            dateItems.forEach(date => date.classList.remove('active'));
            
            // Add active class to clicked date
            this.classList.add('active');
            
            // Store selected date
            selectedDate = this.getAttribute('data-date');
            
            // Check if we can enable the next button
            updateNextButton('step1');
        });
    });

    // Time selector
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all time buttons
            timeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Store selected time and theater
            selectedTime = this.getAttribute('data-time');
            selectedTheater = this.closest('.time-options').previousElementSibling.textContent;
            
            // Check if we can enable the next button
            updateNextButton('step1');
        });
    });

    // Seat selection
    seats.forEach(seat => {
        seat.addEventListener('click', function() {
            // Toggle selected class
            this.classList.toggle('selected');
            
            const seatId = this.getAttribute('data-seat');
            const isPremium = this.classList.contains('premium');
            const price = isPremium ? ticketPrice.premium : ticketPrice.normal;
            
            if (this.classList.contains('selected')) {
                // Add seat to selected seats array
                selectedSeats.push({
                    id: seatId,
                    price: price
                });
            } else {
                // Remove seat from selected seats array
                selectedSeats = selectedSeats.filter(seat => seat.id !== seatId);
            }
            
            // Update seat summary
            updateSeatSummary();
            
            // Check if we can enable the next button
            updateNextButton('step2');
        });
    });

    // Payment methods
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            
            // Add active class to clicked method
            this.classList.add('active');
            
            const paymentMethod = this.getAttribute('data-method');
            
            // Hide all payment forms
            document.querySelectorAll('.payment-form').forEach(form => {
                form.style.display = 'none';
            });
            
            // Show selected payment form
            document.getElementById(paymentMethod + '-payment').style.display = 'block';
        });
    });

    // Next step buttons
    nextStepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.step');
            const nextStepId = this.getAttribute('data-next');
            const nextStep = document.getElementById(nextStepId);
            
            if (nextStepId === 'step3') {
                // Update booking summary
                updateBookingSummary();
            }
            
            // Hide current step and show next step
            currentStep.style.display = 'none';
            nextStep.style.display = 'block';
            
            // Scroll to top of modal
            document.querySelector('.modal-content').scrollTop = 0;
        });
    });

    // Previous step buttons
    prevStepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.step');
            const prevStepId = this.getAttribute('data-prev');
            const prevStep = document.getElementById(prevStepId);
            
            // Hide current step and show previous step
            currentStep.style.display = 'none';
            prevStep.style.display = 'block';
        });
    });

    // Confirm payment button
    confirmPaymentBtn.addEventListener('click', function() {
        // Hide step 3 and show step 4
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'block';
        
        // Update ticket information
        updateTicketInfo();
        
        // Generate random booking ID
        const bookingId = 'CIN' + Math.floor(Math.random() * 9000000 + 1000000);
        document.getElementById('ticketBookingId').textContent = bookingId;
        
        // Scroll to top of modal
        document.querySelector('.modal-content').scrollTop = 0;
    });

    // Download ticket button
    downloadTicketBtn.addEventListener('click', function() {
        alert('Ticket download functionality would be implemented here in a real app.');
    });

    // Close ticket button
    closeTicketBtn.addEventListener('click', function() {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Show sign up form
    showSignUpLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Sign up form would be shown here in a real app.');
    });

    // Coming soon slider navigation
    sliderNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const slider = document.querySelector('.slider-container');
            const scrollAmount = slider.clientWidth;
            
            if (this.classList.contains('prev')) {
                slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    });

    // Helper Functions

    // Update seat summary
    function updateSeatSummary() {
        const selectedSeatsLabel = document.getElementById('selectedSeatsLabel');
        const subtotalAmount = document.getElementById('subtotalAmount');
        const convenienceFee = document.getElementById('convenienceFee');
        const totalAmount = document.getElementById('totalAmount');
        
        if (selectedSeats.length > 0) {
            // Update selected seats label
            const seatLabels = selectedSeats.map(seat => seat.id).join(', ');
            selectedSeatsLabel.textContent = seatLabels;
            
            // Calculate subtotal
            const subtotal = selectedSeats.reduce((total, seat) => total + seat.price, 0);
            subtotalAmount.textContent = '₹' + subtotal;
            
            // Calculate convenience fee
            const fee = Math.round(subtotal * 0.08); // 8% convenience fee
            convenienceFee.textContent = '₹' + fee;
            
            // Calculate total
            const total = subtotal + fee;
            totalAmount.textContent = '₹' + total;
        } else {
            selectedSeatsLabel.textContent = 'None';
            subtotalAmount.textContent = '₹0';
            convenienceFee.textContent = '₹0';
            totalAmount.textContent = '₹0';
        }
    }

    // Update booking summary
    function updateBookingSummary() {
        document.getElementById('summaryMovie').textContent = selectedMovie;
        document.getElementById('summaryTheater').textContent = selectedTheater;
        
        const dateObj = new Date(selectedDate);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        document.getElementById('summaryDateTime').textContent = formattedDate + ', ' + selectedTime;
        
        const seatLabels = selectedSeats.map(seat => seat.id).join(', ');
        document.getElementById('summarySeats').textContent = seatLabels;
        
        const total = selectedSeats.reduce((total, seat) => total + seat.price, 0);
        const fee = Math.round(total * 0.08);
        const finalTotal = total + fee;
        document.getElementById('summaryAmount').textContent = '₹' + finalTotal;
        document.getElementById('qrAmount').textContent = '₹' + finalTotal;
    }

    // Update ticket information
    function updateTicketInfo() {
        document.getElementById('ticketMovie').textContent = selectedMovie;
        document.getElementById('ticketLanguage').textContent = document.getElementById('movieLanguage').textContent + ' • ' + document.getElementById('movieCertificate').textContent;
        
        const dateObj = new Date(selectedDate);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        document.getElementById('ticketDateTime').textContent = formattedDate + ', ' + selectedTime;
        
        document.getElementById('ticketVenue').textContent = selectedTheater;
        
        const seatLabels = selectedSeats.map(seat => seat.id).join(', ');
        document.getElementById('ticketSeats').textContent = seatLabels;
    }

    // Reset booking form
    function resetBookingForm() {
        // Reset variables
        selectedDate = null;
        selectedTime = null;
        selectedTheater = null;
        selectedSeats = [];
        
        // Reset UI
        dateItems.forEach(item => item.classList.remove('active'));
        timeButtons.forEach(btn => btn.classList.remove('active'));
        seats.forEach(seat => seat.classList.remove('selected'));
        
        // Reset summaries
        updateSeatSummary();
        
        // Disable next buttons
        nextStepButtons.forEach(btn => {
            btn.disabled = true;
        });
        
        // Show step 1 only
        document.getElementById('step1').style.display = 'block';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
        document.getElementById('step4').style.display = 'none';
    }

    // Update next button state
    function updateNextButton(stepId) {
        const nextBtn = document.querySelector(`#${stepId} .next-step`);
        
        if (stepId === 'step1') {
            nextBtn.disabled = !(selectedDate && selectedTime);
        } else if (stepId === 'step2') {
            nextBtn.disabled = selectedSeats.length === 0;
        }
    }
});
