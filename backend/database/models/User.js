const { DataTypes } = require('sequelize');
const { sequelize } = require("../index")
const Oink = require("./Oink");

const User = sequelize.define("user", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }
    })
User.hasMany(Oink)

User.belongsToMany(User, {through: "follow", as: "follower", foreignKey: "follower_id"})
User.belongsToMany(User, {through: "follow", as: "following", foreignKey: "following_id"})

module.exports = User