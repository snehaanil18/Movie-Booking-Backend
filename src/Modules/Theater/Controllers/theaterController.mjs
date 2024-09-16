import { validateTheater } from '../Requests/theaterRequest.mjs'
import { createTheater, findTheaterByDetails, getAllTheaters } from '../Repository/theaterRepository.mjs';
import { findUserById } from '../../User/Repository/userRepository.mjs';
import { sendSuccessResponse, sendErrorResponse } from '../Resources/theaterResponse.mjs';

const addTheater = async (req, res) => {
    const { error } = validateTheater(req);
    if (error) {
        return sendErrorResponse(res, error.details, 'Validation failed', 400);
    }
    const { name, address, city, capacity } = req.body;
    const userId = req.payload;

    try {
        const user = await findUserById(userId);
        if (user && user.role === 'admin') {
            const existingTheater = await findTheaterByDetails(name, address, city);
            if (existingTheater) {
                return sendErrorResponse(res, null, 'Theater with the same details already exists', 409);
            }

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
        const user = await findUserById(userId);
        if (user && user.role === 'admin') {
            const theaters = await getAllTheaters();
            return sendSuccessResponse(res, theaters, 'Theaters fetched successfully');
        }
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