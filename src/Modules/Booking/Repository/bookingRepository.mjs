import booking from '../Models/bookingSchema.mjs'

export const createBooking = async(BookingData) => {
    const newBooking = new booking(BookingData)
    return await newBooking.save();
}