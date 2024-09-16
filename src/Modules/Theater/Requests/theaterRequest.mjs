// theaterValidation.js
import Joi from 'joi';

// Define schema for theater validation
export const theaterValidationSchema = Joi.object({
    theaterId: Joi.string().optional(),  // Optional as it's generated automatically
    name: Joi.string().min(1).required().messages({
        'string.base': 'Name should be a type of string',
        'string.empty': 'Name is required',
    }),
    address: Joi.string().min(1).required().messages({
        'string.base': 'Address should be a type of string',
        'string.empty': 'Address is required',
    }),
    city: Joi.string().min(1).required().messages({
        'string.base': 'City should be a type of string',
        'string.empty': 'City is required',
    }),
    capacity: Joi.number().positive().integer().required().messages({
        'number.base': 'Capacity should be a type of number',
        'number.positive': 'Capacity must be a positive number',
        'number.integer': 'Capacity must be an integer',
        'any.required': 'Capacity is required'
    }),
});

// Function to validate theater request
export const validateTheater = (req) => {
    return theaterValidationSchema.validate(req.body, { abortEarly: false });
};
