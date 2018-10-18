const _ = require('lodash')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const JWT_SECRET = process.env.JWT_SECRET

const HotelModel = (sequelize, type) => {
    let Hotel = sequelize.define('hotel', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            require: true
        },
        name: {
            type: type.STRING,
            required: true
        },
        address: {
            type: type.STRING,
            required: true
        },
        description: {
            type: type.STRING,
            required: true
        },
        photo: {
            type: type.BLOB
        },
        geolocation: {
            type: type.STRING
        }
    })
    return Hotel
}

export {HotelModel}