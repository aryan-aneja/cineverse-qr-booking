
// TicketRenderer module for rendering ticket HTML
const TicketRenderer = () => {
    // Render tickets list HTML
    const renderTicketsList = () => {
        // Get tickets from localStorage to ensure we have the latest
        let bookedTickets = [];
        try {
            const savedTickets = localStorage.getItem('bookedTickets');
            if (savedTickets) {
                bookedTickets = JSON.parse(savedTickets);
            }
        } catch (e) {
            console.error('Error loading saved tickets:', e);
        }

        let html = '';
        if (bookedTickets.length === 0) {
            return '<p>No tickets found. Book a movie to see your tickets here!</p>';
        }
        
        bookedTickets.forEach(ticket => {
            const safeBookingId = encodeURIComponent(ticket.bookingId);
            html += `
                <div class="ticket-item">
                    <div class="ticket-details">
                        <h3>${ticket.movie}</h3>
                        <p><strong>Date & Time:</strong> ${ticket.date}, ${ticket.time}</p>
                        <p><strong>Theatre:</strong> ${ticket.theater} (${ticket.location})</p>
                        <p><strong>Seats:</strong> ${ticket.seats}</p>
                        <p><strong>Booking ID:</strong> ${ticket.bookingId}</p>
                        <div class="ticket-qr">
                            <img src="${ticket.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${safeBookingId}`}" alt="Ticket QR Code" width="80" height="80">
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

    return {
        renderTicketsList
    };
};

export default TicketRenderer;
