
// Tickets module for handling ticket booking and management
import TicketStorage from './tickets/ticketStorage.js';
import TicketState from './tickets/ticketState.js';
import TicketRenderer from './tickets/ticketRenderer.js';
import TicketDownloader from './tickets/ticketDownloader.js';
import TicketActions from './tickets/ticketActions.js';

const Tickets = (() => {
    // Initialize components
    const ticketState = TicketState();
    const ticketStorage = TicketStorage();
    const ticketRenderer = TicketRenderer();
    const ticketDownloader = TicketDownloader();
    const ticketActions = TicketActions(ticketState);

    // Initialize
    const init = () => {
        const savedTickets = ticketStorage.loadSavedTickets();
        ticketState.setBookedTickets(savedTickets);
    };

    // Public API
    return {
        init,
        loadSavedTickets: ticketStorage.loadSavedTickets,
        saveTicket: (bookingId) => {
            const ticket = ticketActions.createTicket(bookingId);
            ticketState.addBookedTicket(ticket);
            ticketStorage.saveTickets(ticketState.getBookedTickets());
            return ticket;
        },
        downloadTicket: ticketDownloader.downloadTicket,
        renderTicketsList: ticketRenderer.renderTicketsList,
        
        // State getters and setters
        getSelectedMovie: ticketState.getSelectedMovie,
        setSelectedMovie: ticketState.setSelectedMovie,
        getSelectedDate: ticketState.getSelectedDate,
        setSelectedDate: ticketState.setSelectedDate,
        getSelectedTime: ticketState.getSelectedTime,
        setSelectedTime: ticketState.setSelectedTime,
        getSelectedTheater: ticketState.getSelectedTheater,
        setSelectedTheater: ticketState.setSelectedTheater,
        getSelectedSeats: ticketState.getSelectedSeats,
        setSelectedSeats: ticketState.setSelectedSeats,
        getTicketPrice: ticketState.getTicketPrice,
        getCurrentLocation: ticketState.getCurrentLocation,
        setCurrentLocation: ticketState.setCurrentLocation,
        getBookedTickets: ticketState.getBookedTickets,
        addSeat: ticketState.addSeat,
        removeSeat: ticketState.removeSeat,
        resetBookingState: ticketState.resetBookingState
    };
})();

export default Tickets;
