import { User, Role }from '../db/sequelize';
import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('x-auth')
        const decodedToken = jsonwebtoken.verify(token, JWT_SECRET)
        const user = await User.findById(decodedToken.id, { include: [Role] });
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.role = user.role
        next()
    } catch (error) {
        res.status(401).send('Token not valid')
    }
}

export { authenticate }