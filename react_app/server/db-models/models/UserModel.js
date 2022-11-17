module.exports = (sequelize, DataTypes) => {
    const User= sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowedNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowedNull: false
        },
    })
return User
}