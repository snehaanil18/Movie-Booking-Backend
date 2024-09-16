import mongoose from 'mongoose'

const connectionString = process.env.DATABASE

const db = mongoose.connect(connectionString).then(() => {
    console.log('MongoDB Atlas connection established');
})
.catch((error) => {
    console.log('MongoDB Atlas connection error',error);
})

export default db;