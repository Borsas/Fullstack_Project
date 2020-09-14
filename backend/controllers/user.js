const userRouter = require("express").Router()
const jwt = require("jsonwebtoken")

const User = require("../database/models/User")
const Oink = require("../database/models/Oink")
const Follower = require("../database/models/Follower")

// Get the specific users Oinks
userRouter.get("/:id", async (req, res) => {
    const userId = req.params.id 

    const user = await User.findByPk(userId)

    if (!user) {
        res.status(401).json({
            error: "Invalid user id"
        })
    }

    const oinks = await Oink.findAll({
        attributes: [
            "id",
            "username",
            "content",
            "date",
            "likes"
        ],
        where: {
            userId: userId
        }
    })
    res.json(oinks)
})

// Get all users and their information
userRouter.get("/", async (req, res) => {
    const users = await User.findAll({
        attributes: ["id", "username", "name"],
        include: [{
            model: Oink,
            attributes: ["id", "content", "date"]
        }, {
            model: User,
            as: "follower",
            through: {attributes: []}
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
    res.send(200)
})

module.exports = userRouter