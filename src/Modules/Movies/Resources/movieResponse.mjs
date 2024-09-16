export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const errorResponse = (res, message = 'Error occurred', statusCode = 400, data = null) => {
    // Ensure the status code is valid
    if (typeof statusCode !== 'number') {
        statusCode = 500; // Default to 500 if the status code is invalid
    }

    return res.status(statusCode).json({
        success: false,
        message,
        data
    });
};



