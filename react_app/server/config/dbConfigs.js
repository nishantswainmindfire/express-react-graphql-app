module.exports = {
    "domain1": {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "admin",
        DB: "multi_tenant_poc_db_1",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    "domain2": {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "admin",
        DB: "multi_tenant_poc_db_2",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}