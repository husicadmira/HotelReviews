import { sequelize, Role, User } from '../../db/sequelize';

const JWT_SECRET = process.env.JWT_SECRET

const users = [{
    name: 'Admin', email: 'admin@mail.com', password: 'admin', roleId: 1
}, {
    name: 'User', email: 'user@mail.com', password: 'user', roleId: 2
}]

const populateDB = (done) => {
    sequelize.sync({ force: true }).then(() => {

        Role.bulkCreate([{ name: 'admin' }, { name: 'user' }]).then(() => {
            User.create({
                name: 'Admin', email: 'admin@mail.com', password: 'admin', roleId: 1
            }).then(done())
        })
    })
}

export { populateDB, users }