import { Favorite, Hotel } from '../../db/sequelize';

const addFavorite = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).send({ error: "Hotel not found" });
        }
        let favorite = await Favorite.find({ where: { hotelId: req.params.id, userId: req.user.id } })
        if (favorite) {
            return res.status(400).send({ error: "Hotel already a favorite" });
        }
        favorite = await Favorite.create({ hotelId: req.params.id, userId: req.user.id })
        if (!favorite) {
            return res.status(400).send({ error: "Unable to add hotel as favorite" });
        }
        res.status(200).send(favorite);
    }
    catch (error) {
        res.status(400).send({ error });
    }

}
const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.findAll({ where: { userId: req.user.id }, include: [Hotel] });
        res.status(200).send(favorites);
    } catch (error) {
        res.status(400).send({ error });
    }
}
const removeFavorite = async (req, res) => {
    try {
        await Favorite.destroy({ where: { userId: req.user.id, hotelId: req.params.id } });
        res.status(200).send({ message: "Removed hotel as favorite" });
    } catch (error) {
        res.status(400).send({ error });
    }
}

export {
    addFavorite,
    removeFavorite,
    getFavorites
}