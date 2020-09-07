const express = require("express")
const cors = require("cors")
require("dotenv").config()

// Start
const { connectToDB } = require("./database")

try {
    connectToDB()
} catch (err) {
    console.log(err)
}
const app = express()

const loginRouter = require("./controllers/login")
const oinkRouter = require("./controllers/oinks")


app.use(cors())
app.use(express.json())

app.use("/api/login", loginRouter)
app.use("/api/oinks", oinkRouter)

module.exports = app