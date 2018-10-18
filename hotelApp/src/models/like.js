
const LikeModel = (sequelize, type) => {
    const Like = sequelize.define('like', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            require: true
        },
        score: {
            type: type.INTEGER,
            require: true,
            validate: { min: -1, max: 1 }
        }
    })
    return Like
}

export {LikeModel}