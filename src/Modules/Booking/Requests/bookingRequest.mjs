import Joi from 'joi';

// Define the Joi schema for booking validation
export const validateBooking = (data) => {
  const schema = Joi.object({
    bookingId: Joi.string().uuid().optional(), // Optional since it's auto-generated
    movie: Joi.string().required().messages({
      'string.empty': 'Movie name is required',
    }),
    theater: Joi.string().required().messages({
      'string.empty': 'Theater is required',
    }),
    showTimeId: Joi.string().required().messages({
      'string.empty': 'Showtime ID is required',
    }),
    bookingDate: Joi.date().default(Date.now), // Auto-filled, optional for the user
    seats: Joi.array().items(Joi.number().integer().min(1).required()).min(1).required().messages({
      'array.min': 'At least one seat must be selected',
      'array.base': 'Seats should be an array',
      'number.base': 'Each seat must be a number',
      'number.integer': 'Each seat must be an integer',
    }),
    ticketPrice: Joi.number().positive().required().messages({
      'number.base': 'Ticket price must be a number',
      'number.positive': 'Ticket price must be a positive number',
    }),
    totalAmount: Joi.number().positive().required().messages({
      'number.base': 'Total amount must be a number',
      'number.positive': 'Total amount must be a positive number',
    }),
    paymentStatus: Joi.string().valid('Paid', 'Pending', 'Failed').default('Pending').messages({
      'any.only': 'Payment status must be one of Paid, Pending, or Failed',
    }),
    status: Joi.string().valid('Confirmed', 'Pending', 'Canceled').default('Confirmed').messages({
      'any.only': 'Booking status must be one of Confirmed, Pending, or Canceled',
    }),
    userEmail: Joi.string().email().optional().messages({
      'string.email': 'User email must be a valid email address',
    }),
    userPhone: Joi.string().pattern(/^[0-9]{10}$/).optional().messages({
      'string.pattern.base': 'User phone must be a valid 10-digit number',
    })
  });

  return schema.validate(data, { abortEarly: false });
};
