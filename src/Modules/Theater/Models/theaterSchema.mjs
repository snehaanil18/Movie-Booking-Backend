import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'; 

const theaterSchema = new mongoose.Schema({
    theaterId: {
        type: String,
        unique: true,
        // required: true
    },
    name: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    capacity: { 
        type: Number, 
        required: true 
    }
})

theaterSchema.pre('save',function (next) {
    if(!this.theaterId){
        this.theaterId = uuidv4();
    }
    next();
})

const theater = mongoose.model('theater', theaterSchema);
export default  theater;