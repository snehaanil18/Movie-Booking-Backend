import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';  // Import the uuid library to generate UUIDv4

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true // Automatically handle createdAt and updatedAt
});

// Middleware to assign a UUID before saving the user
userSchema.pre('save', function (next) {
    if (!this.userId) {                // Check if userId is not already set
        this.userId = uuidv4();        // Assign a random UUIDv4 to userId
    }
    next();                            // Proceed with the save operation
});

const User = mongoose.model('User', userSchema);
export default User;
