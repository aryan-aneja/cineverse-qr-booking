
// TicketStorage module for handling localStorage operations
const TicketStorage = () => {
    // Load saved tickets from localStorage
    const loadSavedTickets = () => {
        try {
            const savedTickets = localStorage.getItem('bookedTickets');
            if (savedTickets) {
                return JSON.parse(savedTickets);
            }
        } catch (e) {
            console.error('Error loading saved tickets:', e);
        }
        return [];
    };

    // Save tickets to localStorage
    const saveTickets = (tickets) => {
        try {
            localStorage.setItem('bookedTickets', JSON.stringify(tickets));
        } catch (e) {
            console.error('Error saving tickets:', e);
        }
    };

    return {
        loadSavedTickets,
        saveTickets
    };
};

export default TicketStorage;
