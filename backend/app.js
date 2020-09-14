const express = require("express")
const cors = require("cors")
require("express-async-errors")
require("dotenv").config()

const { connectToDB } = require("./database")
const loginRouter = require("./controllers/login")
const oinkRouter = require("./controllers/oinks")
const userRouter = require("./controllers/user")
const middlware = require("./utils/middleware")

// Try to connect to the Database, if it fails the app will stop
connectToDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(middlware.getAuthToken)

// Routes
app.use("/api/login", loginRouter)
app.use("/api/oinks", oinkRouter)
app.use("/api/user", userRouter)

app.use(middlware.handleErrors)


module.exports = app