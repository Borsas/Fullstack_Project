const express = require("express")
const cors = require("cors")

const app = express()

const loginRouter = require("./controllers/login")
const init = require("./database/connect")

app.use(cors())
app.use(express.json())

app.use("/api/login", loginRouter)

module.exports = app