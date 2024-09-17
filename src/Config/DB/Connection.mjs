import mongoose from 'mongoose'

//get database connection string from env
const connectionString = process.env.DATABASE

//connect to mongoDB
const db = mongoose.connect(connectionString).then(() => {
    console.log('MongoDB Atlas connection established');
})
.catch((error) => {
    console.log('MongoDB Atlas connection error',error);
})

export default db;