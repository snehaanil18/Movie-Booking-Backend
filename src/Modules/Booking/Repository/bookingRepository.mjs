import booking from '../Models/bookingSchema.mjs'

//create a document in mongoDB with the data 
export const createBooking = async(BookingData) => {
    const newBooking = new booking(BookingData)
    return await newBooking.save();
}