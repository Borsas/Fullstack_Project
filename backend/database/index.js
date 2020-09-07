const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/postgres") 

const connectToDB = async () => {
    // Relax, these are just temporary for the time being :-)
    // Will replace with env variables
    let retries = 5
    while (retries) {
        try {
            await sequelize.authenticate()
            console.log("Succesfully connected to database")
            sequelize.sync({force: true})
            break
        } catch (error) {
            retries = retries - 1
            console.log(`Error connecting to database. Retries left ${retries}.`)
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

module.exports = {
    connectToDB, 
    sequelize
}