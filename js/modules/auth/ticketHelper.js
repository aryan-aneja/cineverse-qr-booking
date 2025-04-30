
// Ticket Helper module for handling ticket downloads
const TicketHelper = () => {
    // Download ticket with a mock QR code
    const downloadTicket = (ticketData) => {
        // Create a mock QR code if not provided
        const safeBookingId = encodeURIComponent(ticketData.bookingId);
        const qrCode = ticketData.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${safeBookingId}`;
        
        const ticketHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .ticket {
                        width: 800px;
                        padding: 20px;
                        border: 2px solid #333;
                        margin: 20px auto;
                    }
                    .ticket-header {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 10px;
                    }
                    .movie-title {
                        font-size: 24px;
                        color: #e84545;
                        margin-bottom: 10px;
                    }
                    .ticket-info {
                        margin: 15px 0;
                    }
                    .qr-code {
                        text-align: center;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="ticket">
                    <div class="ticket-header">
                        <h1>CineVerse</h1>
                        <div>Booking ID: ${ticketData.bookingId}</div>
                    </div>
                    <div class="movie-title">${ticketData.movie}</div>
                    <div class="ticket-info">
                        <p><strong>Date & Time:</strong> ${ticketData.date}, ${ticketData.time}</p>
                        <p><strong>Theatre:</strong> ${ticketData.theater}</p>
                        <p><strong>Seats:</strong> ${ticketData.seats}</p>
                    </div>
                    <div class="qr-code">
                        <img src="${qrCode}" alt="Ticket QR Code" width="150" height="150">
                        <p>Scan this QR code at the entrance</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const blob = new Blob([ticketHTML], { type: 'text/html' });
        const downloadUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = `CineVerse_Ticket_${safeBookingId}.html`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);
    };

    return {
        downloadTicket
    };
};

export default TicketHelper;
