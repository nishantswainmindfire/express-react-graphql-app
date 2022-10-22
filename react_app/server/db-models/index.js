const dbConfig = require("../config/dbConfigs")

const { Sequelize, DataTypes } = require('sequelize')

let connectionObjects = {}


for (let domain in dbConfig) {
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
        }
    })
    const db = {}
    sequelize.authenticate().
        then(() => {
            console.log(`connected to ${config.DB} sucessfully`)

            db.Sequelize = Sequelize
            db.sequelize = sequelize
            connectionObjects[domain] = db
            db.posts = require('./PostsModel')(sequelize, DataTypes)
            // db.author = require('./productModel.js')(sequelize, DataTypes)
            //not to recreate tables again and again keep force as false
            db.sequelize.sync({ force: true }).then(() => console.log("Yes resync done!"))
            connectionObjects[domain] = db
        }).
        catch((err) => console.error(`Error connecting to ${config.db} `, err))
    // connectionObjects[domain] = sequelize
}


module.exports = connectionObjects