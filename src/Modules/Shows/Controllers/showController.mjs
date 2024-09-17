import { findUserById } from "../../User/Repository/userRepository.mjs";
import { createShow, findShowByDetails, getAllShows, getShow, getShowsByTitle } from "../Repository/showRepository.mjs";
import { sendErrorResponse, sendSuccessResponse } from "../Resources/showResponse.mjs";
import { showValidation } from "../Requests/showRequest.mjs";
import { getMovie } from "../../Movies/Repository/movieRepository.mjs";
// import { loginValidationSchema } from "../../User/Requests/userRequest.mjs";
// import { findTheaterByName } from "../../Theater/Repository/theaterRepository.mjs";


//add shows for movies in theaters
const addShow = async(req,res) => {
    const { error } = showValidation(req.body);
    if (error) {
        // Map Joi validation errors to a readable format
        const errors = error.details.map(detail => detail.message);
        console.error('Validation errors:', errors); // Log errors to server console
        return sendErrorResponse(res, errors, 'Validation failed', 400);
    }

    //get the details related to show from user
    const {movie,theater,timing,price} = req.body;
    //get id of user from jwt
    const userId = req.payload;
    
    try {
        //find user using the id
        const user = await findUserById(userId);
        //verify user is admin
        if (user && user.role === 'admin') {
            //check if a show with same details exist or not
            const existingShow = await findShowByDetails(movie,theater,timing);
            if (existingShow) {
                return sendErrorResponse(res, null, 'Show with the same details already exists', 409);
            }

            //create a new show 
            const newShow = await createShow({ movie,theater,timing,price });
            return sendSuccessResponse(res, newShow, 'Show added successfully');
        } else {
            return sendErrorResponse(res, null, 'Access denied. Only admin can add shows', 403);
        }
    } catch (err) {
        return sendErrorResponse(res, null, `Server error: ${err.message}`, 500);
    }
}

//list of all shows added
const viewShows = async(req,res) => {
    try{
        //get details of all shows
        const shows = await getAllShows();
        return sendSuccessResponse(res, shows, 'Shows fetched successfully');
    } catch (err) {
        return sendErrorResponse(res, null, `Server error: ${err.message}`, 500);
        
    }
}

//list of shows for a particular movie 
const movieShows = async( req,res) =>{
    try{
        //get the id of movie from params
        const { movieId } = req.params;
        //fetch details of movie using the id
        const movie = await getMovie(movieId);
        
        //send error message if movie is not found
        if (!movie) {
            return sendErrorResponse(res, null, 'Movie not found', 404);
        }
        //get the title of movie from the above fetched details
        const { title } = movie;
        
        //find the shows using title
        const shows = await getShowsByTitle(title);
        
        //send the details of shows of movie
        return sendSuccessResponse(res, shows, 'Shows fetched successfully');
    } catch (err) {
        return sendErrorResponse(res, null, `Server error: ${err.message}`, 500);
        
    }
}

//get a particular show
export const getShowDetails = async(req,res) => {
    try{
        //get id of the show 
        const { showId } = req.params;
        //find the show using id
        const show = await getShow(showId);
        
        //if show doesn't exist send error message
        if(!show){
            return sendErrorResponse(res, null, 'Show not found', 404);
        }
        //send details of the show 
        return sendSuccessResponse(res, show, 'Show fetched successfully');
    }
    catch (err) {
        return sendErrorResponse(res, null, `Server error: ${err.message}`, 500);
        
    }
}

const showController = {
    addShow,
    viewShows,
    movieShows,
    getShowDetails
}

export default showController;