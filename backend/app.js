const express = require("express")
const cors = require("cors")
require("express-async-errors")
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
const userRouter = require("./controllers/user")
const middlware = require("./utils/middleware")

app.use(cors())
app.use(express.json())
app.use(middlware.getAuthToken)

// Routes
app.use("/api/login", loginRouter)
app.use("/api/oinks", oinkRouter)
app.use("/api/user", userRouter)

app.use(middlware.handleErrors)


module.exports = app