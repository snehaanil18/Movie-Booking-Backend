import { validateMovie } from '../Requests/movieRequest.mjs';
import { createMovie, getAllMovies, getPopularMovies, getMovie } from '../Repository/movieRepository.mjs';
import { successResponse, errorResponse } from '../Resources/movieResponse.mjs';
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

        const { title, genre, releaseDate, duration, director, synopsis, language, rating, cast } = req.body;
        const userId = req.payload;
         // Ensure file is correctly retrieved
        const user = await findUserById(userId);
        if (user && user.role === 'admin'){
            const movieData = {
                title,
                genre,
                releaseDate,
                duration: parseInt(duration, 10),
                director,
                synopsis,
                language,
                rating: parseFloat(rating),
                cast, // Ensure cast is sent as JSON string
            };

            const newMovie = await createMovie(movieData, req.file);
            return successResponse(res, newMovie, 'Movie added successfully');
        }

        else {
            return errorResponse(res, null, 'Access denied. Only admins can add movies', 403);
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
        
//         return errorResponse(res, error.details, 'Validation failed', 400);
        
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
//             return successResponse(res, newMovie, 'Movie added successfully');
//         } else {
//             return errorResponse(res, null, 'Access denied. Only admins can add movies', 403);
//         }
//     } catch (err) {
//         return errorResponse(res, null, `Server error: ${err.message}`, 500);
//     }
// };


// View All Movies (if needed, similar to viewTheater)
const viewMovies = async (req, res) => {
    try {
        const movies = await getAllMovies();            
        return successResponse(res, movies, 'Movies fetched successfully');
    } catch (err) {
        return errorResponse (res, null, `Server error: ${err.message}`, 500);
        
    }
};

//home page Movies
const popularMovies = async(req,res) => {
    try{
        const movies = await getPopularMovies();
        return successResponse(res, movies, 'Movies fetched successfully');
    }catch (err) {
        return errorResponse (res, null, `Server error: ${err.message}`, 500);
    }
}

//get details of a particular movie
export const getAMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await getMovie(movieId);
        if (!movie) {
            return errorResponse(res, null, 'Movie not found', 404);
        }
        return successResponse(res, movie, 'Movie fetched successfully');
    } catch (err) {
        return errorResponse(res, null, `Server error: ${err.message}`, 500); // Send proper status code here
    }
};

const movieController = {
    addMovie,
    viewMovies,
    popularMovies,
    getAMovie
};

export default movieController;
