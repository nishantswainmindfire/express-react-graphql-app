const dbConfig = require("../config/dbConfigs")

const { Sequelize, DataTypes } = require('sequelize')

let connectionObjects = {}

async function createConnectionObject(domain) {
    try {
        let config = dbConfig[domain]
        const sequelize = new Sequelize(config.DB,
            config.USER, config.PASSWORD, {
            host: config.HOST,
            dialect: config.dialect,
            operatorsAliases: false,
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            },
            logging: false
        })
        const db = {}

        await sequelize.authenticate()
        console.log(`connected to ${config.DB} sucessfully`)

        db.Sequelize = Sequelize
        db.sequelize = sequelize

        db.posts = require('./models/PostsModel')(sequelize, DataTypes)
        db.author = require('./models/AuthorModel')(sequelize, DataTypes)

        //one to many relation
        db.author.hasMany(db.posts, {
            foreignKey: 'author_id',
            as: 'post'
        })
        db.posts.belongsTo(db.author, {
            foreignKey: 'author_id',
            as: 'author'
        })

        //if u dont want to  recreate tables again and again keep force as false
        await db.sequelize.sync({ force: false, alter: true })
        console.log("Yes resync done!")
        connectionObjects[domain] = db
        return db

    }
    catch (err) {
        console.error(`Error connecting to ${config.db} `, err)
    }

}

async function getConnectionObject(domain) {
    if (connectionObjects[domain] !== undefined)
        return connectionObjects[domain]
    else {
        let db = await createConnectionObject(domain)
        return db
    }
}

module.exports = { getConnectionObject }