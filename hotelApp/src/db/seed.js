import { User, Role } from './sequelize'

export const fillDB = () => {
    return Role.bulkCreate([{ name: 'admin' }, { name: 'user' }]).then(() => {
        return User.create({
            name: 'Admin', email: 'admin@mail.com', password: 'admin', roleId: 1
        })
    })
}