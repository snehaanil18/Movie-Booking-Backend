import express from 'express';

//import controller
import userController from '../Modules/User/Controllers/userController.mjs';
import theaterController from '../Modules/Theater/Controllers/theaterController.mjs';
import movieController  from '../Modules/Movies/Controller/movieController.mjs';
import showController from '../Modules/Shows/Controllers/showController.mjs';
import mailController from '../Utils/Mail Verification/mailController.mjs';
import bookingController from '../Modules/Booking/Controller/bookingController.mjs';
import paymentController from '../Utils/Payment/paymentController.mjs';

//import middleware
import jwtMiddleware from '../Middleware/jwtMiddleware.mjs'
import multerConfig from '../Middleware/multerMiddleware.mjs';

//set up router
const router = express.Router();

//register a new user
router.post('/register-user',userController.register);

//login with registered credentials
router.post('/login-user',userController.login);


router.post('/add-theater',jwtMiddleware,theaterController.addTheater);

router.get('/all-theaters',jwtMiddleware,theaterController.viewTheater);

router.post('/add-movies',jwtMiddleware,multerConfig.single('posterImage'),movieController.addMovie);

router.get('/all-movies',movieController.viewMovies);

router.get('/popular-movies',movieController.popularMovies);

router.get('/get-a-movie/:movieId',movieController.getAMovie);

router.post('/add-show',jwtMiddleware,showController.addShow);

router.get('/all-shows',showController.viewShows);

router.get('/get-movie-shows/:movieId',showController.movieShows);

router.get( '/get-user-profile',jwtMiddleware,userController.getUser);

router.get('/get-show-details/:showId',jwtMiddleware,showController.getShowDetails);

router.post('/verify-email',jwtMiddleware,mailController.emailVerify);

router.post('/verify-email-otp',jwtMiddleware,mailController.verifyOtp);

router.post('/add-booking',jwtMiddleware,bookingController.addBooking);

router.post('/create-order',jwtMiddleware,paymentController.createOrder);

router.post('/verify-payment',jwtMiddleware,paymentController.verifyPayment)

export default router;