const userRouter = require("express").Router()
const jwt = require("jsonwebtoken")

const User = require("../database/models/User")
const Oink = require("../database/models/Oink")
const Follower = require("../database/models/Follower")


// Get users all info
userRouter.get("/:id", async (req, res) => {
    const userId = req.params.id
    const users = await User.findOne({
        where: {
            id: userId
        },
        attributes: ["id", "username", "name"],
        include: [{
            model: Oink,
            attributes: ["id", "content", "date", "likes"]
        }, {
            model: User,
            as: "follower",
            through: {
                attributes: []
            },
            attributes: ["id", "username", "name"]
        }]
    })
    res.json(users)
})

// Follow another user
userRouter.post("/follow/:id", async (req, res) => {
    const userToFollowId = req.params.id
    const userToken = jwt.verify(req.token, process.env.JWT_SECRET_HASH)

    if (!(userToken)) {
        return res.status(401).json({
            error: "Invalid login, missing token."
        })
    }

    const foundFollowUser = await User.findOne({
        where: {
            id: userToFollowId
        }
    })

    if (!foundFollowUser) {
        return res.status(401).json({
            error: "Invalid user id"
        })
    } 
    const user = await User.findOne({where: {username: userToken.username}})

    if (user.id === userToFollowId) {
        return res.status(401).json({
            error: "You can't follow yourself"
        })
    }

    const isUserAlreadyFollowing = await Follower.findOne({
        where: {
            following_id: user.id,
            follower_id: userToFollowId
        }
    })
    if (isUserAlreadyFollowing) {
        await Follower.destroy({
            where: {
                following_id: user.id,
                follower_id: userToFollowId
            }
        })
    } else {
        await Follower.create({
            following_id: user.id,
            follower_id: userToFollowId
        })
    }
    res.sendStatus(200)
})

module.exports = userRouter