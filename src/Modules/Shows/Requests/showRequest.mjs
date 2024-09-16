import Joi from 'joi';

export const showValidation = (data) => {
    const schema = Joi.object({
        movie: Joi.string()
            .min(1)
            .required()
            .messages({
                'string.empty': 'Movie is required',
                'any.required': 'Movie field is required'
            }),
        theater: Joi.object({
            name: Joi.string()
                .min(1)
                .required()
                .messages({
                    'string.empty': 'Theater name is required',
                    'any.required': 'Theater name field is required'
                }),
            capacity: Joi.number()
                .min(1)
                .required()
                .messages({
                    'number.base': 'Capacity must be a number',
                    'number.min': 'Capacity must be greater than 0',
                    'any.required': 'Capacity is required'
                })
        }).required()
            .unknown(true) // Allow additional fields like _id
            .messages({
                'any.required': 'Theater details are required'
            }),
        timing: Joi.string()
            .min(1)
            .required()
            .messages({
                'string.empty': 'Show timing is required',
                'any.required': 'Timing field is required'
            }),
        price: Joi.number()
            .min(1)
            .required()
            .messages({
                'number.base': 'Price must be a number',
                'number.min': 'Price must be greater than 0',
                'any.required': 'Price is required'
            })
    });

    // Validate the incoming request data
    return schema.validate(data);
};
