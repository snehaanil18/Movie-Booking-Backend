import { validateRegistration, validateLogin } from "../Requests/userRequest.mjs";
import { createUser, findUserByEmail, findUserById, verifyPassword } from "../Repository/userRepository.mjs";
import { sendErrorResponse, sendSuccessResponse } from "../Resources/userResponse.mjs";
import jwt from 'jsonwebtoken'


const register = async (req, res) => {
    // Validate incoming data
    const { error } = validateRegistration(req);
    if (error) {
        // Map Joi validation errors to a readable format
        const errors = error.details.map(detail => detail.message);
        return sendErrorResponse(res, errors, 'Validation failed', 400);
    }

    const { name, email, phone, role, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return sendErrorResponse(res, null, 'User already exists', 406);
        }

        // Create and save new user
        const newUser = await createUser({ name, email, phone, role, password });
        return sendSuccessResponse(res, newUser, 'User registered successfully', 201);

    } catch (err) {
        console.error(err);
        return sendErrorResponse(res, null, 'Server error', 500);
    }
};

const login = async (req, res) => {

    const { error } = validateLogin(req);
    if (error) {
        // Map Joi validation errors to a readable format
        const errors = error.details.map(detail => detail.message);
        return sendErrorResponse(res, errors, 'Validation failed', 400);
    }
    
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return sendErrorResponse(res, null, 'Invalid credentials', 401);
        }

        // Verify password
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return sendErrorResponse(res, null, 'Invalid credentials', 401);
        }

        const token = jwt.sign(
            { userId:user.userId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        // Return success response with token
        return sendSuccessResponse(res, {
            email: user.email,
            role:user.role,
            userId:user.userId,
            token,
        }, 'Login successful', 200);

    } catch (err) {
        console.error(err);
        return sendErrorResponse(res, null, 'Server error', 500);
    }
};

const getUser = async(req,res) => {
    try{
        const userId = req.payload;
        const user = await findUserById(userId);
        if (!user) {
            return sendErrorResponse(res, null, 'User not Found', 409);
        }
        return sendSuccessResponse(res, user, 'user fetched successfully');
    }catch (err) {
        console.error(err);
        return sendErrorResponse(res, null, 'Server error', 500);
    }
}

const userController = {
    register,
    login,
    getUser
};

export default userController;