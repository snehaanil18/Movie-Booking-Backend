import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    unique: true,
    default: uuidv4,  // Automatically generate a UUID for each movie
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  cast: [
    {
      type: String,  // Cast is an array of strings (names)
    },
  ],
  synopsis: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  posterImage: {
    type: String,  // Store as a file path or URL
    required: true,
  },
});

// Ensure movieId is set before saving the movie
movieSchema.pre('save', function (next) {
  if (!this.movieId) {
    this.movieId = uuidv4();
  }
  next();
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
