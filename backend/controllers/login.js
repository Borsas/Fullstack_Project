const jwt = require("jsonwebtoken")
const uuid = require("uuid").v4()

const User = require("../database/models/User")

const loginRouter = require("express").Router()

loginRouter.post("/", async (req, res) => {
    
})

loginRouter.get("/", async (req, res) => {
    const users = await User.findAll({
        attributes: ["username", "name"]
    })
    res.json(users)
})

module.exports = loginRouter