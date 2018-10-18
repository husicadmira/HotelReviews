const bcrypt = require('bcryptjs')
const { User, Role } = require('../../db/sequelize')

const register = async (req, res) => {
    try {
        req.body.roleId = 2
        const createdUser = await User.create(req.body)
        res.status(200).send(createdUser)
    } catch (error) {
        res.status(400).send(error)
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        const result = await bcrypt.compare(req.body.password, user.password)
        console.log(result)
        if (!result) {
            return res.status(403).send({ error: "Invalid credentials" })
        }
        const token = user.generateAuthToken()
        res.header('x-auth', token).status(200).send(user)
    }
    catch (error) {
        res.status(400).send({ error })
    }
}


const logout = (req, res) => {
    req.user.removeAuthToken(req.token).then(() => {
        res.status(200).send()
    })
}

const getLoggedInUser = (req, res) => {
    res.send(req.user)
}

const getAll = async (req, res) => {
    const users = await User.findAll({ include: [Role] })
    res.status(200).send(users)
}


export {
    register,
    login,
    logout,
    getLoggedInUser,
    getAll
}