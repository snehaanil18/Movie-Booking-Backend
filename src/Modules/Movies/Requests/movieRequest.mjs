import Joi from 'joi';

// Define the Joi schema for movie validation
export const movieValidationSchema = Joi.object({
    movieId: Joi.string().optional(),  // Optional because it is generated automatically
    title: Joi.string().min(1).required().messages({
        'string.base': 'Title should be a type of string',
        'string.empty': 'Title is required',
        'any.required': 'Title is required',
    }),
    genre: Joi.string().min(1).required().messages({
        'string.base': 'Genre should be a type of string',
        'string.empty': 'Genre is required',
        'any.required': 'Genre is required',
    }),
    releaseDate: Joi.date().required().messages({
        'date.base': 'Release Date should be a valid date',
        'any.required': 'Release Date is required',
    }),
    duration: Joi.number().positive().integer().required().messages({
        'number.base': 'Duration should be a type of number',
        'number.positive': 'Duration must be a positive number',
        'number.integer': 'Duration must be an integer',
        'any.required': 'Duration is required',
    }),
    director: Joi.string().min(1).required().messages({
        'string.base': 'Director should be a type of string',
        'string.empty': 'Director is required',
        'any.required': 'Director is required',
    }),
    cast: Joi.array().items(Joi.string().min(1).required()).required().messages({
        'array.base': 'Cast should be an array of strings',
        'array.items': 'Each cast member should be a string',
        'any.required': 'Cast is required',
    }),
    synopsis: Joi.string().min(1).required().messages({
        'string.base': 'Synopsis should be a type of string',
        'string.empty': 'Synopsis is required',
        'any.required': 'Synopsis is required',
    }),
    language: Joi.string().min(1).required().messages({
        'string.base': 'Language should be a type of string',
        'string.empty': 'Language is required',
        'any.required': 'Language is required',
    }),
    rating: Joi.number().min(0).max(10).optional().messages({
        'number.base': 'Rating should be a type of number',
        'number.min': 'Rating must be at least 0',
        'number.max': 'Rating must be at most 10',
    }),
    posterImage: Joi.string().uri().optional().messages({
        'string.base': 'Poster Image should be a type of string',
        'string.uri': 'Poster Image must be a valid URI',
        'string.empty': 'Poster Image is required',
        'any.required': 'Poster Image is required',
    }),
});

// Function to validate movie request
export const validateMovie = (req) => {
    return movieValidationSchema.validate(req.body, { abortEarly: false });
};
