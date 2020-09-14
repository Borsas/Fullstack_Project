const { Sequelize, DataTypes } = require("sequelize")

const database = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_DATABASE}`
const sequelize = new Sequelize(database)

const connectToDB = async () => {
    let retries = 5
    while (retries) {
        try {
            await sequelize.authenticate()
            console.log("Succesfully connected to database")
            sequelize.sync()
            break
        } catch (error) {
            retries = retries - 1
            console.log(`Error connecting to database. Retries left ${retries}.`)
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    if (retries <= 0){
        console.log("Could not connect to the server")
        process.exit(1)
    }
}

module.exports = {
    connectToDB, 
    sequelize
}