import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'; 

const showSchema = new mongoose.Schema({
    showId: {
        type: String,
        unique: true,
        // required: true
    },
    movie: { 
        type: String, 
        required: true 
    },
    theater: { //store details of theater
        name: { type: String, required: true },  
        capacity: { type: Number, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
    },
    timing: { 
        type: String, 
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    bookedSeats: [Number] //set a array for storing booked seats of a particular show
})

showSchema.pre('save',function (next) {
    if(!this.showId){
        this.showId = uuidv4();
    }
    next();
})

const show = mongoose.model('show', showSchema);
export default  show;