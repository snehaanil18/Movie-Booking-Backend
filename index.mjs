import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import db from './src/Config/DB/Connection.mjs';
import mongoose from 'mongoose'; 
import seedAdmin from './src/Config/Migration/adminSeeding.mjs';
import router from './src/Routes/routes.mjs'
import session from 'express-session';

const MServer = express();

MServer.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
MServer.use(express.json());

MServer.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

MServer.use(router)
MServer.use('/uploads', express.static('./uploads'));

const PORT = process.env.PORT || 4000;

mongoose.connection.once('open', async () => {
    // console.log('Database connected successfully');

    await seedAdmin();

    MServer.listen(PORT, () => {
        console.log(`MServer Listening on port ${PORT}`);
    });
});



MServer.get('/', (req, res) => {
    res.send("Welcome to Movie App");
});