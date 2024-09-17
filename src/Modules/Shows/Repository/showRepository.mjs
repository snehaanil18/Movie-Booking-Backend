import show from '../Models/showSchema.mjs'

export const createShow = async ({ movie, theater, timing, price }) => {
    //create a new document with details
    const newShow = new show({
        movie,
        theater,
        timing,
        price
    });
    //save the show
    return await newShow.save();
}

export const findShowByDetails = async (movie, theater, timing) => {
    //check if show with same details exist
    return await show.findOne({
        movie,
        'theater.name': theater.name,
        'theater.address': theater.address,
        'theater.city': theater.city,
        timing
    });
}

export const getAllShows = async () => {
    //get all show details in mongoDB
    return await show.find();
}

export const getShowsByTitle = async (title) => {
    //find the shows of a movie using its title
    return await show.find({ movie: title }); 
};

export const getShow = async(showId) => {
    //find a show using its id
    return await show.findOne({showId})
}

export const updateShow = async (showId, updateFields) => {
    //update the booked seat array when new bookings are made
    return await show.findOneAndUpdate(
        { showId },
        { $set: updateFields },
        { new: true } // Return the updated document
    );
};