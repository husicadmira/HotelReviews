const _ = require('lodash')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const JWT_SECRET = process.env.JWT_SECRET

const UserModel = (sequelize, type) => {
    let User = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            require: true
        },
        name: {
            type: type.STRING,
            required: true,
            unique: true,
        },
        email: {
            type: type.STRING,
            required: true,
            validate: {
                isEmail: { msg: 'Email is not valid' }
            }
        },
        password: {
            type: type.STRING,
            required: true
        }
    })
    User.prototype.toJSON = function () {
        const { id, name, email } = this.get()
        return { id, name, email }
    }

    User.prototype.generateAuthToken = function () {
        try {
            const { id } = this.get()
            console.log(id)
            const token = jwt.sign({ id }, JWT_SECRET).toString()
            return token
        }
        catch (error) {
            throw new Error(error)
        }
    }

    User.beforeSave(async (user, options) => {
        const password = user.password
        const saltRounds = 10;
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })
        user.password = hashedPassword
    })
    return User
}

export {UserModel}