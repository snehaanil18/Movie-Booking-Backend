import movies from '../Models/movieSchema.mjs'

export const createMovie = async (movieData, files) => {
    // Prepare movie data with poster image filename if available
    const movieWithImage = {
        ...movieData,
        posterImage: files ? files.filename : movieData.posterImage,
    };
    // Create a new movie document with the updated data
    const newMovie = new movies(movieWithImage);
    // Save the new movie to the database
    return await newMovie.save();
};

export const findMovieByDetails = async(title,genre,director,language) => {
    //check if movie with same details exist
    return await movies.findOne({title,genre,director,language})
}


// Get all movies 
export const getAllMovies = async () => {
    return await movies.find();
};

//get popular movies
export const getPopularMovies = async () => {
    return await movies.find().sort({ rating: -1 }).limit(4);  // Sort by rating
};

//get a particular movie
export const getMovie = async(movieId) => {
    return await movies.findOne({_id:movieId});
}

export const getById = async(movieId) => {
    return await movies.findById({_id:movieId});
}