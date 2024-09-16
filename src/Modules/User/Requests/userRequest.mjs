import Joi from 'joi';

export const userValidationSchema = Joi.object({
    userId: Joi.string().optional(),  // Optional as it's generated automatically
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Must be a valid email',
        'string.empty': 'Email is required',
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Phone must be a valid 10-digit number',
        'string.empty': 'Phone is required',
    }),
    role: Joi.string().valid('user', 'admin').required().messages({
        'any.only': 'Role must be either "user" or "admin"',
        'string.empty': 'Role is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required',
    }),
});

export const loginValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Must be a valid email',
        'string.empty': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    }),
});

// Function to validate registration request
export const validateRegistration = (req) => {
    return userValidationSchema.validate(req.body, { abortEarly: false });
};

// Function to validate login request
export const validateLogin = (req) => {
    return loginValidationSchema.validate(req.body, { abortEarly: false });
};