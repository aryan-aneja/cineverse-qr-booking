
// Main application file
import Auth from './modules/auth.js';
import Tickets from './modules/tickets.js';
import UI from './modules/ui.js';
import Events from './modules/events.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize modules
    Tickets.init();
    Auth.initAuthElements();
    Events.initEventListeners();
    
    // Check for existing elements and create if needed
    ensureRequiredElements();
});

// Make sure all required elements are present in the DOM
function ensureRequiredElements() {
    // Ensure ticket-related elements exist
    if (!document.getElementById('ticketsModal')) {
        // Initialize tickets modal with any saved tickets
        const savedTickets = Tickets.loadSavedTickets();
        if (savedTickets.length > 0) {
            UI.showTicketsModal(
                savedTickets,
                Tickets.renderTicketsList,
                Tickets.downloadTicket
            );
            // Hide the modal after creating it
            UI.closeModal('ticketsModal');
        }
    }
}

// Mock html2canvas function for ticket download
window.html2canvas = function(element) {
    return new Promise((resolve, reject) => {
        // Create a mock canvas object that simulates what html2canvas would return
        const mockCanvas = {
            toDataURL: function(type) {
                // Return a data URL for testing purposes
                return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
            }
        };
        resolve(mockCanvas);
    });
};
