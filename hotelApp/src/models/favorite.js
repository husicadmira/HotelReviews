const _ = require('lodash')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const JWT_SECRET = process.env.JWT_SECRET

const FavoriteModel = (sequelize, type) => {
    let Favorite = sequelize.define('favorite', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            require: true
        }
    })


    return Favorite
}

export {FavoriteModel}