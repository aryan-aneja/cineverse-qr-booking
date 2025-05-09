
// UI module for handling UI interactions
const UI = (() => {
    // Modal handling
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Update seat summary
    const updateSeatSummary = (selectedSeats, ticketPrice) => {
        const selectedSeatsLabel = document.getElementById('selectedSeatsLabel');
        const subtotalAmount = document.getElementById('subtotalAmount');
        const convenienceFee = document.getElementById('convenienceFee');
        const totalAmount = document.getElementById('totalAmount');
        
        if (!selectedSeatsLabel || !subtotalAmount || !convenienceFee || !totalAmount) return;
        
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
    };

    // Update booking summary
    const updateBookingSummary = (selectedMovie, selectedTheater, currentLocation, selectedDate, selectedTime, selectedSeats) => {
        const summaryMovie = document.getElementById('summaryMovie');
        const summaryTheater = document.getElementById('summaryTheater');
        const summaryDateTime = document.getElementById('summaryDateTime');
        const summarySeats = document.getElementById('summarySeats');
        const summaryAmount = document.getElementById('summaryAmount');
        const qrAmount = document.getElementById('qrAmount');
        
        if (!summaryMovie || !summaryTheater || !summaryDateTime || !summarySeats || !summaryAmount || !qrAmount) return;
        
        if (selectedMovie) summaryMovie.textContent = selectedMovie;
        if (selectedTheater) summaryTheater.textContent = selectedTheater + ' (' + currentLocation + ')';
        
        if (selectedDate) {
            const dateObj = new Date(selectedDate);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            summaryDateTime.textContent = formattedDate + ', ' + selectedTime;
        }
        
        if (selectedSeats && selectedSeats.length > 0) {
            const seatLabels = selectedSeats.map(seat => seat.id).join(', ');
            summarySeats.textContent = seatLabels;
            
            const total = selectedSeats.reduce((total, seat) => total + seat.price, 0);
            const fee = Math.round(total * 0.08);
            const finalTotal = total + fee;
            summaryAmount.textContent = '₹' + finalTotal;
            qrAmount.textContent = '₹' + finalTotal;
        }
    };

    // Update ticket information
    const updateTicketInfo = (selectedMovie, selectedDate, selectedTime, selectedTheater, currentLocation, selectedSeats) => {
        const ticketMovie = document.getElementById('ticketMovie');
        const ticketLanguage = document.getElementById('ticketLanguage');
        const ticketDateTime = document.getElementById('ticketDateTime');
        const ticketVenue = document.getElementById('ticketVenue');
        const ticketSeats = document.getElementById('ticketSeats');
        const movieLanguage = document.getElementById('movieLanguage');
        const movieCertificate = document.getElementById('movieCertificate');
        
        if (!ticketMovie || !ticketLanguage || !ticketDateTime || !ticketVenue || !ticketSeats) return;
        
        if (selectedMovie) ticketMovie.textContent = selectedMovie;
        
        if (movieLanguage && movieCertificate) {
            ticketLanguage.textContent = movieLanguage.textContent + ' • ' + movieCertificate.textContent;
        }
        
        if (selectedDate) {
            const dateObj = new Date(selectedDate);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            ticketDateTime.textContent = formattedDate + ', ' + selectedTime;
        }
        
        if (selectedTheater) {
            ticketVenue.textContent = selectedTheater + ' (' + currentLocation + ')';
        }
        
        if (selectedSeats && selectedSeats.length > 0) {
            const seatLabels = selectedSeats.map(seat => seat.id).join(', ');
            ticketSeats.textContent = seatLabels;
        }
    };

    // Generate payment QR code
    const generatePaymentQR = () => {
        // Generate an actual QR code for payment
        const totalAmount = document.getElementById('summaryAmount')?.textContent || '₹0';
        const paymentQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT_${totalAmount.replace('₹', '')}_CINEVERSE`;
        
        const paymentQRCode = document.getElementById('paymentQRCode');
        if (paymentQRCode) {
            paymentQRCode.src = paymentQRUrl;
        }
    };

    // Generate ticket QR code
    const generateTicketQR = () => {
        // Generate an actual QR code for ticket
        const bookingId = 'CIN' + Math.floor(Math.random() * 9000000 + 1000000);
        const ticketQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingId}_CINEVERSE_TICKET`;
        
        const ticketQRCode = document.getElementById('ticketQRCode');
        if (ticketQRCode) {
            ticketQRCode.src = ticketQRUrl;
        }
        
        return bookingId;
    };

    // Reset booking form
    const resetBookingForm = () => {
        // Reset UI
        document.querySelectorAll('.date-item').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.seat:not(.booked)').forEach(seat => seat.classList.remove('selected'));
        
        // Reset step visibility
        const step1 = document.getElementById('step1');
        const step2 = document.getElementById('step2');
        const step3 = document.getElementById('step3');
        const step4 = document.getElementById('step4');
        
        if (step1) step1.style.display = 'block';
        if (step2) step2.style.display = 'none';
        if (step3) step3.style.display = 'none';
        if (step4) step4.style.display = 'none';
        
        // Disable next buttons
        document.querySelectorAll('.next-step').forEach(btn => {
            btn.disabled = true;
        });
    };

    // Update next button state
    const updateNextButtonState = (stepId, selectedDate, selectedTime, selectedSeats) => {
        const nextBtn = document.querySelector(`#${stepId} .next-step`);
        if (!nextBtn) return;
        
        if (stepId === 'step1') {
            nextBtn.disabled = !(selectedDate && selectedTime);
        } else if (stepId === 'step2') {
            nextBtn.disabled = selectedSeats.length === 0;
        }
    };

    // Show/create the tickets modal
    const showTicketsModal = (bookedTickets, renderTicketsList, downloadTicket) => {
        let ticketsModal = document.getElementById('ticketsModal');
        
        if (!ticketsModal) {
            // Create tickets modal if it doesn't exist
            const ticketsModalHTML = `
                <div id="ticketsModal" class="modal">
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <h2>My Tickets</h2>
                        <div id="ticketsList" class="tickets-list">
                            ${bookedTickets.length === 0 ? 
                                '<p>No tickets found. Book a movie to see your tickets here!</p>' : 
                                renderTicketsList()}
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', ticketsModalHTML);
            
            // Get the newly created modal
            ticketsModal = document.getElementById('ticketsModal');
            
            // Add close button functionality
            const closeButton = ticketsModal.querySelector('.close-modal');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    if (ticketsModal) {
                        ticketsModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                });
            }

            // Close on outside click
            ticketsModal.addEventListener('click', function(event) {
                if (event.target === ticketsModal) {
                    ticketsModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Update tickets list content or add new content
        const ticketsListDiv = document.getElementById('ticketsList');
        if (ticketsListDiv) {
            ticketsListDiv.innerHTML = bookedTickets.length === 0 ? 
                '<p>No tickets found. Book a movie to see your tickets here!</p>' : 
                renderTicketsList();
            
            // Add download functionality for each ticket
            const downloadButtons = ticketsListDiv.querySelectorAll('.download-ticket');
            downloadButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const ticketId = this.getAttribute('data-ticket-id');
                    if (ticketId) {
                        downloadTicket(ticketId);
                    }
                });
            });
        }
        
        // Show the modal
        if (ticketsModal) {
            ticketsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    // Show theatres section
    const showTheatresSection = (currentLocation) => {
        // Hide main content sections
        const mainSections = document.querySelectorAll('main > section:not(#theatres-section)');
        mainSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show or create theatres section
        let theatresSection = document.getElementById('theatres-section');
        if (!theatresSection) {
            theatresSection = document.createElement('section');
            theatresSection.id = 'theatres-section';
            theatresSection.innerHTML = `
                <div class="container mx-auto px-4 py-8">
                    <h2 class="text-3xl font-bold mb-6">Our Theatres</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src="https://placehold.co/600x400/1a1a2e/FFFFFF?text=CineVerse+IMAX" alt="IMAX Theatre" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="font-bold text-xl mb-2">CineVerse IMAX</h3>
                                <p class="text-gray-700">123 Movie Lane, ${currentLocation}</p>
                                <p class="text-gray-600 mt-2">Experience movies in stunning IMAX quality with immersive sound.</p>
                                <div class="mt-4">
                                    <div class="flex items-center mb-1">
                                        <span class="font-semibold mr-2">Amenities:</span>
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-1">IMAX</span>
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-1">4K</span>
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Dolby Atmos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src="https://placehold.co/600x400/1a1a2e/FFFFFF?text=CineVerse+Gold" alt="Gold Class Theatre" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="font-bold text-xl mb-2">CineVerse Gold</h3>
                                <p class="text-gray-700">456 Cinema Road, ${currentLocation}</p>
                                <p class="text-gray-600 mt-2">Luxury recliner seating with in-seat dining service.</p>
                                <div class="mt-4">
                                    <div class="flex items-center mb-1">
                                        <span class="font-semibold mr-2">Amenities:</span>
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-1">Recliners</span>
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-1">Dining</span>
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Premium Bar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src="https://placehold.co/600x400/1a1a2e/FFFFFF?text=CineVerse+Family" alt="Family Theatre" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="font-bold text-xl mb-2">CineVerse Family</h3>
                                <p class="text-gray-700">789 Entertainment Ave, ${currentLocation}</p>
                                <p class="text-gray-600 mt-2">Family-friendly theatre with play area for children.</p>
                                <div class="mt-4">
                                    <div class="flex items-center mb-1">
                                        <span class="font-semibold mr-2">Amenities:</span>
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-1">Play Zone</span>
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mr-1">Kid Seats</span>
                                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Family Packages</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 text-center">
                        <button id="backToHome" class="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/80 transition-all">
                            Back to Home
                        </button>
                    </div>
                </div>
            `;
            document.querySelector('main').appendChild(theatresSection);
            
            // Add event listener to back button
            const backToHomeBtn = document.getElementById('backToHome');
            if (backToHomeBtn) {
                backToHomeBtn.addEventListener('click', function() {
                    if (theatresSection) {
                        theatresSection.style.display = 'none';
                    }
                    // Show all main sections again
                    mainSections.forEach(section => {
                        section.style.display = 'block';
                    });
                });
            }
        } else {
            theatresSection.style.display = 'block';
        }
    };

    // Show offers section (placeholder implementation)
    const showOffersSection = () => {
        // Hide main content sections
        const mainSections = document.querySelectorAll('main > section:not(#offers-section)');
        mainSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show or create offers section
        let offersSection = document.getElementById('offers-section');
        if (!offersSection) {
            offersSection = document.createElement('section');
            offersSection.id = 'offers-section';
            offersSection.innerHTML = `
                <div class="container mx-auto px-4 py-8">
                    <h2 class="text-3xl font-bold mb-6">Special Offers</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="bg-primary text-white p-2 text-center">
                                <h3 class="font-bold">WEEKEND OFFER</h3>
                            </div>
                            <div class="p-4">
                                <h4 class="font-bold text-xl mb-2">Buy 1 Get 1 Free</h4>
                                <p class="text-gray-700 mb-4">Valid on all movies every Saturday & Sunday. Limited seats available.</p>
                                <div class="text-sm text-gray-500">
                                    <p>Use code: WEEKEND2024</p>
                                    <p>Valid till: 30 Apr 2024</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="bg-primary text-white p-2 text-center">
                                <h3 class="font-bold">NEW USER SPECIAL</h3>
                            </div>
                            <div class="p-4">
                                <h4 class="font-bold text-xl mb-2">50% Off First Booking</h4>
                                <p class="text-gray-700 mb-4">For first-time CineVerse users. Maximum discount of ₹150.</p>
                                <div class="text-sm text-gray-500">
                                    <p>Use code: NEWUSER</p>
                                    <p>Valid till: 31 May 2024</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="bg-primary text-white p-2 text-center">
                                <h3 class="font-bold">FOOD COMBO</h3>
                            </div>
                            <div class="p-4">
                                <h4 class="font-bold text-xl mb-2">20% Off Food Combos</h4>
                                <p class="text-gray-700 mb-4">Enjoy your movie with discounted popcorn & beverage combos.</p>
                                <div class="text-sm text-gray-500">
                                    <p>Use code: FOODFEST</p>
                                    <p>Valid till: 15 Apr 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 text-center">
                        <button id="backToHomeOffers" class="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/80 transition-all">
                            Back to Home
                        </button>
                    </div>
                </div>
            `;
            document.querySelector('main').appendChild(offersSection);
            
            // Add event listener to back button
            const backToHomeOffersBtn = document.getElementById('backToHomeOffers');
            if (backToHomeOffersBtn) {
                backToHomeOffersBtn.addEventListener('click', function() {
                    if (offersSection) {
                        offersSection.style.display = 'none';
                    }
                    // Show all main sections again
                    mainSections.forEach(section => {
                        section.style.display = 'block';
                    });
                });
            }
        } else {
            offersSection.style.display = 'block';
        }
    };

    return {
        openModal,
        closeModal,
        updateSeatSummary,
        updateBookingSummary,
        updateTicketInfo,
        generatePaymentQR,
        generateTicketQR,
        resetBookingForm,
        updateNextButtonState,
        showTicketsModal,
        showTheatresSection,
        showOffersSection
    };
})();

export default UI;
