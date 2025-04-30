
// TicketActions module for ticket creation and management
const TicketActions = (ticketState) => {
    // Create a new ticket object
    const createTicket = (bookingId) => {
        const safeBookingId = encodeURIComponent(bookingId);
        
        return {
            bookingId: bookingId,
            movie: ticketState.getSelectedMovie(),
            date: new Date(ticketState.getSelectedDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: ticketState.getSelectedTime(),
            theater: ticketState.getSelectedTheater(),
            location: ticketState.getCurrentLocation(),
            seats: ticketState.getSelectedSeats().map(seat => seat.id).join(', '),
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${safeBookingId}_CINEVERSE_TICKET`
        };
    };

    return {
        createTicket
    };
};

export default TicketActions;
