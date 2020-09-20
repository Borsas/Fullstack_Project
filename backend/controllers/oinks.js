const jwt = require("jsonwebtoken")
const { Op } = require("sequelize")

const Oink = require("../database/models/Oink")
const User = require("../database/models/User")
const Follower = require("../database/models/Follower")
const LikedOinks = require("../database/models/LikedOinks")

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
    const date = Math.round((new Date()).getTime() / 1000)

    const newOink = await Oink.create({
        content: body.content,
        date,
        likes: 0,
        userId: user.id
    })

    await newOink.save()
    // Find a better way to do this lol
    return res.json({
        id: newOink.id,
        content: newOink.content,
        date: newOink.date,
        likes: newOink.likes,
        user: {
            username: user.username,
            name: user.name,
            id: user.id
        }
    })

})

// Like a Oink
//TODO
// Make the SQL Queries more efficent, im pretty bad at theese
oinkRouter.post("/like/:id", async (req, res) => {
    const userToken = jwt.verify(req.token, process.env.JWT_SECRET_HASH)
    const OinkId = req.params.id 

    if (!(userToken)) {
        return res.status(401).json({
            error: "Invalid login, missing token."
        })
    }

    const oink = await Oink.findByPk(OinkId)
    if (!oink){
        return res.status(401).json({
            error: "Invalid Oink id"
        })
    }
    
    const findIfLiked = await LikedOinks.findOne({
        where: {
            userId: userToken.id,
            oinkId: OinkId
        }
    })

    if(!findIfLiked) {
        await oink.increment("likes", {by: 1})
        await LikedOinks.create({
            userId: userToken.id,
            oinkId: OinkId
        })
    } else {
        await oink.decrement("likes", {by: 1})
        await LikedOinks.destroy({
            where: {
                userId: userToken.id,
                oinkId: OinkId
            }
        })
    }
    return res.json({id: oink.id, likes: oink.likes})
})


oinkRouter.get("/", async (req, res) => {
    //const userToken = jwt.verify(req.token, process.env.JWT_SECRET_HASH)
    
    const oinks = await Oink.findAll({
        attributes: ["id", "content", "likes", "date"],
        include: [
            {model: Follower, User: []},
        ],
        where: {
            '$follow.following_id$': "dc052fa4-eaf7-4ac1-8e80-44a0144b3f89",
                
        },
    })
    console.log(oinks)
    res.json(oinks)
})

module.exports = oinkRouter