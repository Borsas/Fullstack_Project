const jwt = require("jsonwebtoken")
const uuid = require("uuid").v4()

const Oink = require("../database/models/Oink")

const oinkRouter = require("express").Router()

oinkRouter.post("/", async (req, res) => {
    const body = req.body
    if( !body.user || !body.content) {
        res.sendStatus(400).json({"error": "invalid body"})
    }
    const date = new Date().toDateString()
    const newOink = await Oink.create({
        user: body.user,
        content: body.content,
        likes: 0,
        date: date
    })
    res.sendStatus(200).json(newOink)

})

oinkRouter.get("/", async (req, res) => {
    const oinks = await Oink.findAll({
        attributes: ["user", "content", "likes", "date"]
    })
    res.json(oinks)
})

module.exports = oinkRouter