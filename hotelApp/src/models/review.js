
const ReviewModel = (sequelize, type) => {
    const Review = sequelize.define('review', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            require: true
        },
        rating: {
            type: type.INTEGER,
            require: true,
            validate: { min: 0, max: 5 }
        },
        description: {
            type: type.STRING,
            require: true
        }
    })
    return Review
}

export {ReviewModel}