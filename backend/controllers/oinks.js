const jwt = require("jsonwebtoken")

const Oink = require("../database/models/Oink")
const User = require("../database/models/User")

const oinkRouter = require("express").Router()

oinkRouter.post("/", async (req, res) => {
    const body = req.body
    const userToken = jwt.verify(req.token, process.env.JWT_SECRET_HASH)

    if (!(userToken)) {
        return res.status(401).json({
            error: "Invalid login, missing token."
        })
    }
    if (!(body.content)) {
        return res.status(401).json({
            error: "Content missing"
        })
    }

    const user = await User.findByPk(userToken.id)
    const date = new Date().toISOString()

    const newOink = await Oink.create({
        username: user.username,
        content: body.content,
        date,
        likes: 0,
        userId: user.id
    })

    await newOink.save()
    // Find a better way to do this lol
    return res.json({
        id: newOink.id,
        username: newOink.username,
        content: newOink.content,
        date: newOink.date,
        likes: newOink.likes,
    })

})

oinkRouter.get("/", async (req, res) => {
    const oinks = await Oink.findAll({
        attributes: ["username", "content", "likes", "date"]
    })
    res.json(oinks)
})

module.exports = oinkRouter