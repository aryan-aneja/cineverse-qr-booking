
// TicketState module for managing ticket state
const TicketState = () => {
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
    const setBookedTickets = (tickets) => { bookedTickets = tickets; };
    const addBookedTicket = (ticket) => { bookedTickets.push(ticket); };

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
        setBookedTickets,
        addBookedTicket,
        addSeat,
        removeSeat,
        resetBookingState
    };
};

export default TicketState;
