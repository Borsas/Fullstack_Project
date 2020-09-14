const { sequelize } = require("../index")

const Follower = sequelize.model("follow", {})

module.exports = Follower