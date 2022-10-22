module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        title: {
            type: DataTypes.STRING,
            allowedNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowedNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowedNull: true
        }
    })
return Post
}