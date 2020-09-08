const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const loginRouter = require("express").Router()

const User = require("../database/models/User")

loginRouter.post("/", async (req, res) => {
    const body = req.body

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })
    const correctPassword = user === null
        ? false
        : await bcrypt.compare(body.password, user.password)
    
    if (!(user && correctPassword)) {
        return res.status(401).json({
            error: "Invalid username of password"
        })
    }

    const userToken = {
        username: user.username,
        id: user.id
    }
    console.log(process.env.JWT_SECRET_HASH)

    const token = jwt.sign(userToken, process.env.JWT_SECRET_HASH)

    res.status(200).send({
        token,
        username: user.username,
        name: user.name
    })
})

loginRouter.post("/register", async (req, res) => {
    const body = req.body
    if (!(body.password && body.username && body.name)) {
        return res.status(401).json({
            error: "Invalid name, username or password."
        })
    }
    const exists = User.findOne({
        where: {
            username: body.username
        }
    })
    
    if (exists) {
        return res.status(400).json({
            error: "Username already taken"
        })
    }

    const salt = 15
    const passwordHash = await bcrypt.hash(body.password, salt)

    const user = User.build({
        name: body.name,
        username: body.username,
        password: passwordHash
    })
    await user.save()
    return res.json(user)


})


module.exports = loginRouter