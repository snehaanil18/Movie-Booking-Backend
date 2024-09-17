import { validateMovie } from '../Requests/movieRequest.mjs';
import { createMovie, getAllMovies, getPopularMovies, getMovie,findMovieByDetails } from '../Repository/movieRepository.mjs';
import {  sendSuccessResponse, sendErrorResponse  } from '../Resources/movieResponse.mjs';
import { findUserById } from '../../User/Repository/userRepository.mjs';

// Add Movie
const addMovie = async (req, res) => {
    try {
        // const { error } = validateMovie(req);
        // if (error) {
        //     return res.status(400).json({
        //         success: false,
        //         message: error.details,
        //         data: 400
        //     });
        // }


        //collect the details from request body
        const { title, genre, releaseDate, duration, director, synopsis, language, rating, cast } = req.body;
        //get userid using jwt
        const userId = req.payload;
         // Ensure file is correctly retrieved
        const user = await findUserById(userId);
        //confirm the user is admin
        if (user && user.role === 'admin'){
            //check if movie with same details already exist
            const existingMovie = await findMovieByDetails(title,genre,director,language);
            if(existingMovie){
                return sendErrorResponse(res, null, 'Movie with same details already exist', 409);
            }
            //set the incomming data in an object
            const movieData = {
                title,
                genre,
                releaseDate,
                duration: parseInt(duration, 10),
                director,
                synopsis,
                language,
                rating: parseFloat(rating),
                cast, 
            };

            //add the movie details
            const newMovie = await createMovie(movieData, req.file);
            return sendSuccessResponse(res, newMovie, 'Movie added successfully');
        }

        else {
            return sendErrorResponse(res, null, 'Access denied. Only admins can add movies', 403);
        }
        

    } catch (err) {
        console.error('Error adding movie:', err); // Log the error to console for debugging
        return res.status(500).json({
            success: false,
            message: `Server error: ${err.message}`,
            data: 500
        });
    }
};

// const addMovie = async (req, res) => {
//     console.log(req.body,'add');

//     console.log('File:', req.file);
//     // Validate incoming movie data
//     const { error } = validateMovie(req);
//     if (error) {
//         console.log(error);
        
//         return sendErrorResponse(res, error.details, 'Validation failed', 400);
        
//     }

//     // Extract movie data from request body
//     const { title, genre, releaseDate, duration, director, cast, synopsis, language, rating } = req.body;
//     const posterImage = req.file ? req.file.filename : null;
//     console.log(posterImage);
    
//     const userId = req.payload;  // Assuming userId comes from payload (e.g., JWT token)

//     try {
//         // Find user by ID to check admin privileges
//         const user = await findUserById(userId);
        
//         // Check if the user is an admin
//         if (user && user.role === 'admin') {
//             // Prepare movie data
//             const movieData = {
//                 title,
//                 genre,
//                 releaseDate,
//                 duration: parseInt(duration, 10),  // Convert duration to integer
//                 director,
//                 cast,  // Cast is already expected as an array of strings
//                 synopsis,
//                 language,
//                 rating: parseFloat(rating),  // Convert rating to float
//                 posterImage,
//                 userId
//             };

//             // Call repository function to save the new movie
//             const newMovie = await createMovie(movieData);

//             // Send success response with the new movie data
//             return sendSuccessResponse(res, newMovie, 'Movie added successfully');
//         } else {
//             return sendErrorResponse(res, null, 'Access denied. Only admins can add movies', 403);
//         }
//     } catch (err) {
//         return sendErrorResponse(res, null, `Server error: ${err.message}`, 500);
//     }
// };


// View All Movies
const viewMovies = async (req, res) => {
    try {
        //get all documents in movie collection
        const movies = await getAllMovies();            
        return sendSuccessResponse(res, movies, 'Movies fetched successfully');
    } catch (err) {
        return sendErrorResponse (res, null, `Server error: ${err.message}`, 500);
        
    }
};

//home page Movies
const popularMovies = async(req,res) => {
    try{
        //get the movies with higher rating
        const movies = await getPopularMovies();
        return sendSuccessResponse(res, movies, 'Movies fetched successfully');
    }catch (err) {
        return sendErrorResponse (res, null, `Server error: ${err.message}`, 500);
    }
}

//get details of a particular movie
export const getAMovie = async (req, res) => {
    try {
        //get the id of particular movie from params
        const { movieId } = req.params;
        //get details of pariticular movie
        const movie = await getMovie(movieId);
        //send error response if movie of given id is not found
        if (!movie) {
            return sendErrorResponse(res, null, 'Movie not found', 404);
        }
        return sendSuccessResponse(res, movie, 'Movie fetched successfully');
    } catch (err) {
        return sendErrorResponse(res, null, `Server error: ${err.message}`, 500); // Send proper status code here
    }
};



const movieController = {
    addMovie,
    viewMovies,
    popularMovies,
    getAMovie
};

export default movieController;
