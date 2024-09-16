import show from '../Models/showSchema.mjs'

export const createShow = async ({ movie, theater, timing, price }) => {
    const newShow = new show({
        movie,
        theater,
        timing,
        price
    });
    return await newShow.save();
}

export const findShowByDetails = async (movie, theater, timing) => {
    return await show.findOne({
        movie,
        'theater.name': theater.name,
        'theater.address': theater.address,
        'theater.city': theater.city,
        timing
    });
}

export const getAllShows = async () => {
    return await show.find();
}

export const getShowsByTitle = async (title) => {
    return await show.find({ movie: title }); 
};

export const getShow = async(showId) => {
    return await show.findOne({showId})
}

export const updateShow = async (showId, updateFields) => {
    return await show.findOneAndUpdate(
        { showId },
        { $set: updateFields },
        { new: true } // Return the updated document
    );
};