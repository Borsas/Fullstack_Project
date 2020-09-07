const userRouter = require("express").Router()

const User = require("../database/models/User")
const Oink = require("../database/models/Oink")

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

module.exports = userRouter