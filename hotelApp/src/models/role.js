
const RoleModel = (sequelize, type) => {
    return sequelize.define('role', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            require: true
        },
        name: {
            type: type.STRING,
            require: true
        }
    })
}

export {RoleModel}