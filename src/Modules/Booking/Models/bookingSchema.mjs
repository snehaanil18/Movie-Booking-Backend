import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    default: uuidv4,  // Automatically generate a unique booking ID
    unique: true,
  },
  userId: {
    type: String,
    // required: true,
  },
  movie: {
    type: String,
    required: true,
  },
  theater: {
    type: String,
    required: true,
  },
  showTimeId: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,  // Automatically set to current date
  },
  seats: {
    type: [Number],  // Array of seat numbers
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Failed'],
    default: 'Pending',
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Pending', 'Canceled'],
    default: 'Confirmed',
  },
  userEmail: {
    type: String,
  },
  userPhone: {
    type: String,
  }
});

bookingSchema.pre('save',function (next) {
  if(!this.bookingId){
      this.bookingId= uuidv4();
  }
  next();
})

const booking = mongoose.model('booking', bookingSchema);
export default booking;
