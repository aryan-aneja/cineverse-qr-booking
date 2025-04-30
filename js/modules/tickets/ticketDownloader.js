
// TicketDownloader module for handling ticket downloads
const TicketDownloader = () => {
    // Download ticket as HTML file
    const downloadTicket = (ticketId) => {
        // Get ticket from localStorage
        let bookedTickets = [];
        try {
            const savedTickets = localStorage.getItem('bookedTickets');
            if (savedTickets) {
                bookedTickets = JSON.parse(savedTickets);
            }
        } catch (e) {
            console.error('Error loading saved tickets:', e);
            return;
        }
        
        const ticket = bookedTickets.find(t => t.bookingId === ticketId);
        if (!ticket) return;

        const safeBookingId = encodeURIComponent(ticket.bookingId);

        // Create a virtual ticket for download
        const ticketHTML = `
            <div style="width:800px; padding:20px; border:2px solid #333; font-family:Arial, sans-serif;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h1 style="color:#e84545;">CineVerse</h1>
                    <div style="text-align:right;">
                        <p><strong>Booking ID:</strong> ${ticket.bookingId}</p>
                        <img src="${ticket.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${safeBookingId}`}" alt="Ticket QR Code" width="100" height="100">
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

        // Use Blob and URL.createObjectURL instead of data URL
        const blob = new Blob([ticketHTML], { type: 'text/html' });
        const downloadUrl = URL.createObjectURL(blob);
        
        // Create an anchor and trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = `CineVerse_Ticket_${safeBookingId}.html`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Clean up the URL object
        URL.revokeObjectURL(downloadUrl);
    };

    return {
        downloadTicket
    };
};

export default TicketDownloader;
