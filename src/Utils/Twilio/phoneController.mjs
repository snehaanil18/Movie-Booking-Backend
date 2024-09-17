import twilio from 'twilio';

const accountSid = process.env.acct_sid; 
const authToken = process.env.auth_token;
const client = new twilio(accountSid, authToken);

export const sendBookingDetails = async (userPhone, bookingDetails,time) => {
    try {
        const message = `Your booking has been confirmed!\n\n` +
                        `Movie: ${bookingDetails.movie}\n` +
                        `Theater: ${bookingDetails.theater}\n` +
                        `Show Time: ${time}\n` +
                        `Booking Date: ${bookingDetails.bookingDate}\n` +
                        `Seat Number: ${bookingDetails.seats.join(', ')}\n` +
                        `Total Amount: ₹${bookingDetails.totalAmount}\n\n` +
                        `Thank you for booking with us!`;

        const response = await client.messages.create({
            body: message,
            from: `${process.env.whatsapp}`, // Your Twilio WhatsApp-enabled number
            to: `whatsapp:+91${userPhone}` // User's WhatsApp number
        });

        console.log('Message sent successfully, SID:', response.sid);
    } catch (error) {
        console.error('Failed to send message:', error);
    }
};



