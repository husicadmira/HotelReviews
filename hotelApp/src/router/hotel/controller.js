import { Hotel, Review, Favorite, Like } from '../../db/sequelize';

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
const calculateRating = async (hotelId) => {
    const favorite = await Favorite.count({ where: { hotelId }, col: 'id' });
    const reviews = await Review.findAll({ where: { hotelId } });
    let likesScore = 0;
    await asyncForEach(reviews, async (review) => {
        let likes = await Like.sum('score', { where: { reviewId: review.id } });
        if (!likes) likes = 0;
        likesScore += review.rating * (1 + likes);
    })
    return favorite + likesScore
}

const add = async (req, res) => {
    try {
        const hotel = await Hotel.create(req.body);
        if (!hotel) {
            return res.status(400).send({ error: "An error occured while retrieving hotel" });
        }
        res.status(200).send(hotel);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const result = await Hotel.destroy({ where: { id: req.params.id } });
        if (!result) {
            return res.status(400).send({ error: "An error occured while deleting hotel" });
        }
        res.status(200).send("Deleted");
    }
    catch (error) {
        res.status(400).send({ error });
    }
}

const get = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(400).send({ error: "An error occured while retrieving hotel" });
        }
        hotel.dataValues.overallRating = await calculateRating(hotel.id);
        res.status(200).send(hotel);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
}


const getAll = async (req, res) => {
    try {
        const hotels = await Hotel.findAll({ order: [['name', 'ASC']] });
        if (!hotels) {
            return res.status(400).send({ error: "An error occured while retrieving list of hotels" });
        }
        res.status(200).send(hotels);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const hotel = await Hotel.update(req.body, { where: { id: req.params.id } });
        if (!hotel) {
            return res.status(403).send({ error: "An error occured while editing hotel details" });
        }
        res.status(200).send({ message: "Hotel successfully updated" });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
}


export {
    add,
    remove,
    get,
    getAll,
    update
}