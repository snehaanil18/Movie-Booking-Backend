//function to send a success response
export const sendSuccessResponse = (res, data, message = 'Operation successful', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

//function to send an error response
export const sendErrorResponse = (res, errors, message = 'Operation failed', statusCode = 400) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });
};
