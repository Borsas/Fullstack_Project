const { sequelize } = require("../index")
const User = require("./User")

const Follower = sequelize.define("follow", {})

User.belongsToMany(User, {through: "follow", as: "follower", foreignKey: "follower_id"})
User.belongsToMany(User, {through: "follow", as: "following", foreignKey: "following_id"})

module.exports = Follower