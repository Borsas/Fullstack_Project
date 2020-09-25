const userRouter = require("express").Router()
const jwt = require("jsonwebtoken")

const User = require("../database/models/User")
const Oink = require("../database/models/Oink")
const Follower = require("../database/models/Follower")


// Get all users
userRouter.get("/", async (req, res) => {
    const user = await User.findAll({
        attributes: ["id", "username", "name"],
        include: [{
            model: Oink,
            attributes: ["id", "content", "date", "likes"],
            include: {
                model: User,
                attributes: ["username", "name", "id"]
            }
        }, {
            model: User,
            as: "follower",
            through: {
                attributes: []
            },
            attributes: ["id", "username", "name"]
        }]
    })
    res.json(user)
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

    if (userToken.id === userToFollowId) {
        return res.status(401).json({
            error: "You can't follow yourself"
        })
    }

    const settings = {
        following_id: userToken.id,
        follower_id: userToFollowId
    }
    
    const user = {
        id: userToken.id,
        name: userToken.name,
        username: userToken.username
    }
    console.log(user)

    const isUserAlreadyFollowing = await Follower.findOne({
        where: {
            ...settings
        }
    })
    //TODO Make this a lot more better
    if (isUserAlreadyFollowing) {
        await Follower.destroy({
            where: {
                ...settings
            }
        })
        res.status(200).json({
            userWhoFollowed: user,
            followedUser: foundFollowUser,
            followed: false
        })
    } else {
        await Follower.create(settings)
        res.status(200).json({
            userWhoFollowed: user,
            followedUser: foundFollowUser,
            followed: true
        })
    }
})

module.exports = userRouter