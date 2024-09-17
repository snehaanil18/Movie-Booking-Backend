
import { getShow,updateShow } from '../../Shows/Repository/showRepository.mjs';
import {sendSuccessResponse,sendErrorResponse} from '../Resources/bookingResponse.mjs'
import { validateBooking } from '../Requests/bookingRequest.mjs';
import { createBooking } from '../Repository/bookingRepository.mjs';
import {sendBookingDetails} from '../../../Utils/Twilio/phoneController.mjs' 

const addBooking = async (req, res) => {
    const { error } = validateBooking(req.body);
    if (error) {
        // Map Joi validation errors to a readable format
        const errors = error.details.map(detail => detail.message);
        console.error('Validation errors:', errors); // Log errors to server console
        return sendErrorResponse(res, errors, 'Validation failed', 400);
    }
    try {
        const { movie, theater, showTimeId,bookingDate ,seats, ticketPrice, totalAmount, userEmail, userPhone } = req.body;
        
        //get the user id from jwt
        const userId = req.payload;
        // Validate request
        // if (!userId || !movie || !theater || !showTimeId || seats.length === 0 || !ticketPrice || !totalAmount) {
        //     return sendErrorResponse(res, null,'All fields are required', 400);
        // }
       
        //fetch the show using the show id in request body
        const show = await getShow(showTimeId);

        //if show with given id does not exist display error message
        if (!show) {
            return sendErrorResponse(res, null,'Show not found', 404);
        }

        // Ensure seats and bookedSeats are arrays of numbers
        const seatNumbers = seats.map(seat => Number(seat));
        const bookedSeatNumbers = show.bookedSeats.map(seat => Number(seat));

        // Check if seats are already booked
        const alreadyBookedSeats = seatNumbers.filter(seat => bookedSeatNumbers.includes(seat));
        console.log(alreadyBookedSeats);

        //if selected seats are already booked send error message
        if (alreadyBookedSeats.length > 0) {
            return sendErrorResponse(res,alreadyBookedSeats,'Some seats are already booked', 404);
        }

        //set the incomming data in a object
        const BookingData = {
            userId,
            movie,
            theater,
            showTimeId,
            bookingDate,
            seats,
            ticketPrice,
            totalAmount,
            userEmail,
            userPhone
        }

        //create a new booking entry in booking table
        const newBooking = await createBooking(BookingData);
        //set the seats selected in booking as booked
        show.bookedSeats = [...show.bookedSeats, ...seats];
        //update the details of seat in show table
        await updateShow(showTimeId, { bookedSeats: show.bookedSeats });

        //send the details related to the booking to user
        await sendBookingDetails(userPhone, BookingData,show.timing);
        return sendSuccessResponse(res, newBooking, 'Booking created successfully');

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const bookingController = {
    addBooking
}

export default bookingController;