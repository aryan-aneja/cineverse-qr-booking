
// Events module for handling event listeners
import Auth from './auth.js';
import Tickets from './tickets.js';
import UI from './ui.js';

const Events = (() => {
    const initEventListeners = () => {
        setupNavigation();
        setupBookingButtons();
        setupModalHandlers();
        setupLocationDropdown();
        setupDateTimeSelectors();
        setupSeatSelectors();
        setupPaymentHandlers();
        setupSearchFunctionality();
        setupMovieFilter();
        setupSliderNavigation();
    };

    const setupNavigation = () => {
        // Navigation links functionality
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href').substring(1); // Remove the # from the href
                
                // Handle special navigation cases
                if (this.id === 'theatresLink') {
                    UI.showTheatresSection(Tickets.getCurrentLocation());
                } else if (this.id === 'offersLink') {
                    UI.showOffersSection();
                } else {
                    // Regular scroll to section
                    const section = document.getElementById(target);
                    if (section) {
                        window.scrollTo({
                            top: section.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Book now button
        const bookNowBtn = document.getElementById('bookNowBtn');
        if (bookNowBtn) {
            bookNowBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const nowShowing = document.getElementById('now-showing');
                if (nowShowing) {
                    window.scrollTo({
                        top: nowShowing.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // My Tickets button
        const myTicketsBtn = document.getElementById('myTicketsBtn');
        if (myTicketsBtn) {
            myTicketsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                UI.showTicketsModal(
                    Tickets.getBookedTickets(),
                    Tickets.renderTicketsList,
                    Tickets.downloadTicket
                );
            });
        } else {
            // Create My Tickets button if it doesn't exist
            const navBarRight = document.querySelector('.navbar-right');
            if (navBarRight) {
                const myTicketsBtn = document.createElement('a');
                myTicketsBtn.id = 'myTicketsBtn';
                myTicketsBtn.href = '#';
                myTicketsBtn.className = 'btn btn-primary btn-sm ms-2';
                myTicketsBtn.innerHTML = '<i class="fas fa-ticket me-1"></i> My Tickets';
                
                const signInBtn = document.getElementById('signInBtn');
                navBarRight.insertBefore(myTicketsBtn, signInBtn);
                
                myTicketsBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    UI.showTicketsModal(
                        Tickets.getBookedTickets(),
                        Tickets.renderTicketsList,
                        Tickets.downloadTicket
                    );
                });
            }
        }
    };

    const setupBookingButtons = () => {
        // Book tickets buttons
        const bookTicketButtons = document.querySelectorAll('.btn-book');
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
                Tickets.resetBookingState();
                UI.resetBookingForm();
                
                // Open booking modal
                UI.openModal('bookingModal');
                
                // Set selected movie
                Tickets.setSelectedMovie(movieTitle);
            });
        });
    };

    const setupModalHandlers = () => {
        // Close modal buttons
        const closeModalButtons = document.querySelectorAll('.close-modal');
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                UI.closeModal(modal.id);
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const bookingModal = document.getElementById('bookingModal');
            const signInModal = document.getElementById('signInModal');
            const ticketsModal = document.getElementById('ticketsModal');
            
            if (event.target === bookingModal) {
                UI.closeModal('bookingModal');
            }
            if (event.target === signInModal) {
                UI.closeModal('signInModal');
            }
            if (event.target === ticketsModal) {
                UI.closeModal('ticketsModal');
            }
        });

        // Next step buttons
        const nextStepButtons = document.querySelectorAll('.next-step');
        nextStepButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = this.closest('.step');
                const nextStepId = this.getAttribute('data-next');
                const nextStep = document.getElementById(nextStepId);
                
                if (nextStepId === 'step3') {
                    // Update booking summary
                    UI.updateBookingSummary(
                        Tickets.getSelectedMovie(),
                        Tickets.getSelectedTheater(),
                        Tickets.getCurrentLocation(),
                        Tickets.getSelectedDate(),
                        Tickets.getSelectedTime(),
                        Tickets.getSelectedSeats()
                    );
                    
                    // Generate QR code for payment
                    UI.generatePaymentQR();
                }
                
                // Hide current step and show next step
                currentStep.style.display = 'none';
                nextStep.style.display = 'block';
                
                // Scroll to top of modal
                document.querySelector('.modal-content').scrollTop = 0;
            });
        });

        // Previous step buttons
        const prevStepButtons = document.querySelectorAll('.prev-step');
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
        const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
        if (confirmPaymentBtn) {
            confirmPaymentBtn.addEventListener('click', function() {
                // Hide step 3 and show step 4
                document.getElementById('step3').style.display = 'none';
                document.getElementById('step4').style.display = 'block';
                
                // Update ticket information
                UI.updateTicketInfo(
                    Tickets.getSelectedMovie(),
                    Tickets.getSelectedDate(),
                    Tickets.getSelectedTime(),
                    Tickets.getSelectedTheater(),
                    Tickets.getCurrentLocation(),
                    Tickets.getSelectedSeats()
                );
                
                // Generate QR code for ticket
                const bookingId = UI.generateTicketQR();
                document.getElementById('ticketBookingId').textContent = bookingId;
                
                // Save ticket information to localStorage
                Tickets.saveTicket(bookingId);
                
                // Scroll to top of modal
                document.querySelector('.modal-content').scrollTop = 0;
            });
        }

        // Download ticket button
        const downloadTicketBtn = document.getElementById('downloadTicketBtn');
        if (downloadTicketBtn) {
            downloadTicketBtn.addEventListener('click', function() {
                const bookingId = document.getElementById('ticketBookingId').textContent;
                Tickets.downloadTicket(bookingId);
            });
        }

        // Close ticket button
        const closeTicketBtn = document.getElementById('closeTicketBtn');
        if (closeTicketBtn) {
            closeTicketBtn.addEventListener('click', function() {
                UI.closeModal('bookingModal');
            });
        }
    };

    const setupLocationDropdown = () => {
        const locationBtn = document.getElementById('locationBtn');
        const locationDropdown = document.getElementById('locationDropdown');
        const selectedLocationText = document.getElementById('selectedLocation');
        
        if (locationBtn) {
            locationBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                locationDropdown.style.display = locationDropdown.style.display === 'block' ? 'none' : 'block';
            });
        }
        
        // Close location dropdown when clicking outside
        document.addEventListener('click', function() {
            if (locationDropdown) {
                locationDropdown.style.display = 'none';
            }
        });
        
        // Prevent dropdown from closing when clicking inside it
        if (locationDropdown) {
            locationDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
        
        // Location selection
        const locationItems = document.querySelectorAll('.location-item');
        locationItems.forEach(item => {
            item.addEventListener('click', function() {
                const newLocation = this.getAttribute('data-location');
                Tickets.setCurrentLocation(newLocation);
                if (selectedLocationText) {
                    selectedLocationText.textContent = newLocation;
                }
                locationDropdown.style.display = 'none';
            });
        });
    };

    const setupDateTimeSelectors = () => {
        // Date selector
        const dateItems = document.querySelectorAll('.date-item');
        dateItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all dates
                dateItems.forEach(date => date.classList.remove('active'));
                
                // Add active class to clicked date
                this.classList.add('active');
                
                // Store selected date
                Tickets.setSelectedDate(this.getAttribute('data-date'));
                
                // Check if we can enable the next button
                UI.updateNextButtonState('step1', Tickets.getSelectedDate(), Tickets.getSelectedTime(), []);
            });
        });

        // Time selector
        const timeButtons = document.querySelectorAll('.time-btn');
        timeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all time buttons
                timeButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Store selected time and theater
                Tickets.setSelectedTime(this.getAttribute('data-time'));
                Tickets.setSelectedTheater(this.closest('.time-options').previousElementSibling.textContent);
                
                // Check if we can enable the next button
                UI.updateNextButtonState('step1', Tickets.getSelectedDate(), Tickets.getSelectedTime(), []);
            });
        });
    };

    const setupSeatSelectors = () => {
        const seats = document.querySelectorAll('.seat:not(.booked)');
        seats.forEach(seat => {
            seat.addEventListener('click', function() {
                // Toggle selected class
                this.classList.toggle('selected');
                
                const seatId = this.getAttribute('data-seat');
                const isPremium = this.classList.contains('premium');
                
                if (this.classList.contains('selected')) {
                    // Add seat to selected seats array
                    Tickets.addSeat(seatId, isPremium);
                } else {
                    // Remove seat from selected seats array
                    Tickets.removeSeat(seatId);
                }
                
                // Update seat summary
                UI.updateSeatSummary(Tickets.getSelectedSeats(), Tickets.getTicketPrice());
                
                // Check if we can enable the next button
                UI.updateNextButtonState('step2', null, null, Tickets.getSelectedSeats());
            });
        });
    };

    const setupPaymentHandlers = () => {
        // Payment methods
        const paymentMethods = document.querySelectorAll('.payment-method');
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
    };

    const setupSearchFunctionality = () => {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const movieCards = document.querySelectorAll('.movie-card');
        
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                movieCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const info = card.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || info.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    };

    const setupMovieFilter = () => {
        // Filter buttons for movies
        const filterButtons = document.querySelectorAll('.filter-btn');
        const movieCards = document.querySelectorAll('.movie-card');
        
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
    };

    const setupSliderNavigation = () => {
        // Coming soon slider navigation
        const sliderNavButtons = document.querySelectorAll('.slider-nav');
        
        if (sliderNavButtons) {
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
        }
    };

    return {
        initEventListeners
    };
})();

export default Events;
