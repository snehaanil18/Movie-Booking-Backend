import Theater from '../Models/theaterSchema.mjs';

export const createTheater = async ({ name, address, city, capacity, userId }) => {
    const newTheater = new Theater({
        name,
        address,
        city,
        capacity,
        userId
    });
    return await newTheater.save();
};

export const findTheaterByDetails = async (name, address, city) => {
    return await Theater.findOne({ name, address, city });
};

export const findTheaterByName = async (name) => {
    return await Theater.findOne({ name });
};

export const getAllTheaters = async() => {
    return await Theater.find();
}