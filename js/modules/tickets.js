
// Tickets module for handling ticket booking and management
const Tickets = (() => {
    // State
    let bookedTickets = [];
    let selectedMovie = null;
    let selectedDate = null;
    let selectedTime = null;
    let selectedTheater = null;
    let selectedSeats = [];
    let ticketPrice = {
        normal: 250,
        premium: 350
    };
    let currentLocation = "Mumbai";

    // Initialize
    const init = () => {
        loadSavedTickets();
    };

    // Load saved tickets from localStorage
    const loadSavedTickets = () => {
        try {
            const savedTickets = localStorage.getItem('bookedTickets');
            if (savedTickets) {
                bookedTickets = JSON.parse(savedTickets);
            }
        } catch (e) {
            console.error('Error loading saved tickets:', e);
        }
        return bookedTickets;
    };

    // Save tickets to localStorage
    const saveTicket = (bookingId) => {
        const encodedBookingId = encodeURIComponent(bookingId);
        const ticket = {
            bookingId: bookingId,
            movie: selectedMovie,
            date: new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: selectedTime,
            theater: selectedTheater,
            location: currentLocation,
            seats: selectedSeats.map(seat => seat.id).join(', '),
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedBookingId}_CINEVERSE_TICKET`
        };
        
        bookedTickets.push(ticket);
        
        try {
            // Save to localStorage
            localStorage.setItem('bookedTickets', JSON.stringify(bookedTickets));
        } catch (e) {
            console.error('Error saving ticket:', e);
        }
    };

    // Download ticket as HTML file
    const downloadTicket = (ticketId) => {
        const ticket = bookedTickets.find(t => t.bookingId === ticketId);
        if (!ticket) return;

        const encodedBookingId = encodeURIComponent(ticket.bookingId);

        // Create a virtual ticket for download
        const ticketHTML = `
            <div style="width:800px; padding:20px; border:2px solid #333; font-family:Arial, sans-serif;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h1 style="color:#e84545;">CineVerse</h1>
                    <div style="text-align:right;">
                        <p><strong>Booking ID:</strong> ${ticket.bookingId}</p>
                        <img src="${ticket.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodedBookingId}`}" alt="Ticket QR Code" width="100" height="100">
                    </div>
                </div>
                <hr style="border:1px solid #ddd;">
                <h2 style="color:#333;">${ticket.movie}</h2>
                <div style="display:flex; justify-content:space-between;">
                    <div>
                        <p><strong>Date & Time:</strong> ${ticket.date}, ${ticket.time}</p>
                        <p><strong>Theatre:</strong> ${ticket.theater} (${ticket.location})</p>
                        <p><strong>Seats:</strong> ${ticket.seats}</p>
                    </div>
                </div>
                <div style="margin-top:20px; text-align:center; font-size:12px; color:#666;">
                    <p>Present this ticket at the entrance. Enjoy your movie!</p>
                </div>
            </div>
        `;

        // Create a data URL from HTML - using encodeURIComponent to properly handle special characters
        const ticketData = 'data:text/html;charset=utf-8,' + encodeURIComponent(ticketHTML);
        
        // Create an anchor and trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = ticketData;
        downloadLink.download = `CineVerse_Ticket_${encodedBookingId}.html`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    // Render tickets list HTML
    const renderTicketsList = () => {
        let html = '';
        if (bookedTickets.length === 0) {
            return '<p>No tickets found. Book a movie to see your tickets here!</p>';
        }
        
        bookedTickets.forEach(ticket => {
            const encodedBookingId = encodeURIComponent(ticket.bookingId);
            html += `
                <div class="ticket-item">
                    <div class="ticket-details">
                        <h3>${ticket.movie}</h3>
                        <p><strong>Date & Time:</strong> ${ticket.date}, ${ticket.time}</p>
                        <p><strong>Theatre:</strong> ${ticket.theater} (${ticket.location})</p>
                        <p><strong>Seats:</strong> ${ticket.seats}</p>
                        <p><strong>Booking ID:</strong> ${ticket.bookingId}</p>
                        <div class="ticket-qr">
                            <img src="${ticket.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodedBookingId}`}" alt="Ticket QR Code" width="80" height="80">
                        </div>
                    </div>
                    <button class="download-ticket" data-ticket-id="${ticket.bookingId}">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            `;
        });
        return html;
    };

    // Getters and setters
    const getSelectedMovie = () => selectedMovie;
    const setSelectedMovie = (movie) => { selectedMovie = movie; };
    
    const getSelectedDate = () => selectedDate;
    const setSelectedDate = (date) => { selectedDate = date; };
    
    const getSelectedTime = () => selectedTime;
    const setSelectedTime = (time) => { selectedTime = time; };
    
    const getSelectedTheater = () => selectedTheater;
    const setSelectedTheater = (theater) => { selectedTheater = theater; };
    
    const getSelectedSeats = () => selectedSeats;
    const setSelectedSeats = (seats) => { selectedSeats = seats; };
    
    const getTicketPrice = () => ticketPrice;
    
    const getCurrentLocation = () => currentLocation;
    const setCurrentLocation = (location) => { currentLocation = location; };
    
    const getBookedTickets = () => bookedTickets;

    const addSeat = (seatId, isPremium) => {
        const price = isPremium ? ticketPrice.premium : ticketPrice.normal;
        selectedSeats.push({
            id: seatId,
            price: price
        });
    };

    const removeSeat = (seatId) => {
        selectedSeats = selectedSeats.filter(seat => seat.id !== seatId);
    };

    const resetBookingState = () => {
        selectedDate = null;
        selectedTime = null;
        selectedTheater = null;
        selectedSeats = [];
    };

    return {
        init,
        loadSavedTickets,
        saveTicket,
        downloadTicket,
        renderTicketsList,
        getSelectedMovie,
        setSelectedMovie,
        getSelectedDate,
        setSelectedDate,
        getSelectedTime,
        setSelectedTime,
        getSelectedTheater,
        setSelectedTheater,
        getSelectedSeats,
        setSelectedSeats,
        getTicketPrice,
        getCurrentLocation,
        setCurrentLocation,
        getBookedTickets,
        addSeat,
        removeSeat,
        resetBookingState
    };
})();

export default Tickets;
