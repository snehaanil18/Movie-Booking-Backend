import { validateTheater } from '../Requests/theaterRequest.mjs'
import { createTheater, findTheaterByDetails, getAllTheaters } from '../Repository/theaterRepository.mjs';
import { findUserById } from '../../User/Repository/userRepository.mjs';
import { sendSuccessResponse, sendErrorResponse } from '../Resources/theaterResponse.mjs';

const addTheater = async (req, res) => {
    //validate the incomming request
    const { error } = validateTheater(req);
    if (error) {
        return sendErrorResponse(res, error.details, 'Validation failed', 400);
    }

    //get the details from request body
    const { name, address, city, capacity } = req.body;
    //get userid from jwt
    const userId = req.payload;

    try {
        //get user details using userId
        const user = await findUserById(userId);
        //check if the user is admin
        if (user && user.role === 'admin') {
            //check if theater with same details exist
            const existingTheater = await findTheaterByDetails(name, address, city);
            //send error message
            if (existingTheater) {
                return sendErrorResponse(res, null, 'Theater with the same details already exists', 409);
            }

            //create a new theater with details
            const newTheater = await createTheater({ name, address, city, capacity, userId });
            return sendSuccessResponse(res, newTheater, 'Theater added successfully');
        } else {
            return sendErrorResponse(res, null, 'Access denied. Only admin can add theaters', 403);
        }
    } catch (err) {
        return sendErrorResponse(res, null, `Server error: ${err.message}`, 500);
    }
};

const viewTheater = async (req, res) => {

    const userId = req.payload;
    

    try {
        //verify if the get request is from admin user
        const user = await findUserById(userId);
        if (user && user.role === 'admin') {
            //get details of all theaters
            const theaters = await getAllTheaters();
            //send the fetched details
            return sendSuccessResponse(res, theaters, 'Theaters fetched successfully');
        }
        //if user is not admin send error response
        else {
            return sendErrorResponse(res, null, 'Access denied. Only admin can view theaters', 403);
        }
    }
    catch (err) {
        return sendErrorResponse(res, null, `Server error: ${err.message}`, 500);
    }
}

const theaterController = {
    addTheater,
    viewTheater
}

export default theaterController;