const port = process.env.PORT

import Sequelize from 'sequelize';
import { UserModel } from '../models/user';
import { RoleModel } from '../models/role';
import { HotelModel } from '../models/hotel';
import { ReviewModel } from '../models/review';
import { LikeModel } from '../models/like';
import { FavoriteModel } from '../models/favorite';

const sequelize = new Sequelize(process.env.DB, process.env.user, process.env.pass, {
    host: process.env.host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
})

const User = UserModel(sequelize, Sequelize)
const Role = RoleModel(sequelize, Sequelize)
const Hotel = HotelModel(sequelize, Sequelize)
const Favorite = FavoriteModel(sequelize, Sequelize)
const Review = ReviewModel(sequelize, Sequelize)
const Like = LikeModel(sequelize, Sequelize)


User.belongsTo(Role, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Favorite.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Favorite.belongsTo(Hotel, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Review.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Review.belongsTo(Hotel, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Like.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Like.belongsTo(Review, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

export {
    User,
    Role,
    Hotel,
    Like,
    sequelize,
    Favorite,
    Review
}