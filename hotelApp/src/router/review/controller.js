import { User, Review, Like } from '../../db/sequelize';

const addLike = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).send({ error: "Review not found" });
        }
        let like = await Like.findOne({ where: { userId: req.user.id, reviewId: req.params.id } });
        if (like) {
            if (like.score == 1) {
                return res.status(400).send({ error: "You already liked this review" });
            }
            else {
                like = await Like.update({ score: 1 }, { where: { id: like.id } });
                return res.status(200).send(like);
            }
        }
        like = await Like.create({ userId: req.user.id, reviewId: req.params.id, score: 1 });
        if (!like) {
            return res.status(400).send({ error: "An error occured while adding like" });
        }
        res.status(200).send(like);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
const removeLike = async (req, res) => {
    try {
        await Like.destroy({where:{ userId: req.user.id, reviewId: req.params.id, score: 1 }})
        res.status(200).send({message:"Sucessfully removed like"})
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
const addDislike = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
        if (!review) {
            return res.status(404).send({ error: "Review not found" })
        }
        let like = await Like.findOne({ where: { userId: req.user.id, reviewId: req.params.id } })
        if (like) {
            if (like.score == -1) {
                return res.status(400).send({ error: "You already disliked this review" });
            }
            else {
                like = await Like.update({ score: -1 }, { where: { id: like.id } })
                return res.status(200).send(like)
            }
        }
        like = await Like.create({ userId: req.user.id, reviewId: req.params.id, score: -1 })
        if (!like) {
            return res.status(400).send({ error: "An error occured while adding dislike" });
        }
        res.status(200).send(like)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}

const removeDislike = async (req, res) => {
    try {
        await Like.destroy({where:{ userId: req.user.id, reviewId: req.params.id, score: -1 }})
        res.status(200).send({message:"Sucessfully removed dislike!"})
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}


const addReview = async (req, res) => {
    try {
        const reviewObject = {
            description: req.body.description,
            rating: req.body.rating,
            userId: req.user.id,
            hotelId: req.params.id
        }
        const review = await Review.create(reviewObject)
        if (!review) {
            return res.status(403).send({ error: "Ann error occured while creating review" })
        }
        res.status(200).send(review)
    }
    catch (error) {
        res.status(400).send({ error })
    }
}



const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { hotelId: req.params.id } })
        if (!reviews) {
            return res.status(403).send({ error: "An error occured while retrieving reviews" })
        }
        res.status(200).send(reviews)
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
}
const getLikesForReview = async (req, res) => {
    try {
        const reviews = await Like.findAll({ where: { score: 1, reviewId: req.params.id }, include: [User] })
        if (!reviews) {
            return res.status(403).send({ error: "An error occured while retrieving reviews" })
        }
        res.status(200).send(reviews)
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
}
const getDislikesForReview = async (req, res) => {
    try {
        const reviews = await Like.findAll({ where: { score: -1, reviewId: req.params.id }, include: [User] })
        if (!reviews) {
            return res.status(403).send({ error: "An error occured while retrieving reviews" })
        }
        res.status(200).send(reviews)
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }
}

export {
    addLike,
    addDislike,
    removeLike,
    removeDislike,
    addReview,
    getReviews,
    getLikesForReview,
    getDislikesForReview
}