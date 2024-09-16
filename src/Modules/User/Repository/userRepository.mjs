import users from '../Models/userSchema.mjs';
import bcrypt from 'bcrypt';

// Function to find a user by email
export const findUserByEmail = async (email) => {
    return await users.findOne({ email });
};

// Function to create a new user
export const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new users({
        ...userData,
        password: hashedPassword
    });

    return await newUser.save();
};

//Check the entered password
export const verifyPassword = async (inputPassword, hashedPassword) => {
    return bcrypt.compare(inputPassword, hashedPassword);
};

export const findUserById = async (userId) => {
    return await users.findOne({userId});
};