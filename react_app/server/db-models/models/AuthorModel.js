module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define("author", {
        userId: {
            type: DataTypes.STRING,
            allowedNull: false
        },
        email_address: {
            type: DataTypes.STRING,
            allowedNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowedNull: false
        },
        posts:{
            type:DataTypes.JSON,
            allowedNull:true
        }
    })
return Author
}