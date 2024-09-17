import Theater from '../Models/theaterSchema.mjs';


export const createTheater = async ({ name, address, city, capacity, userId }) => {
    //create a new theater document
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
    //find an entry with given details
    return await Theater.findOne({ name, address, city });
};

export const findTheaterByName = async (name) => {
    //find theater using name
    return await Theater.findOne({ name });
};

export const getAllTheaters = async() => {
    //get details of all theaters in mongoDB
    return await Theater.find();
}