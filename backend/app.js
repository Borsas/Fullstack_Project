const express = require("express")
const cors = require("cors")

// Start
const { connectToDB } = require("./database")
connectToDB()
const app = express()

const loginRouter = require("./controllers/login")
const oinkRouter = require("./controllers/oinks")


app.use(cors())
app.use(express.json())

app.use("/api/login", loginRouter)
app.use("/api/oinks", oinkRouter)

module.exports = app