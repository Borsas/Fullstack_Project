const { DataTypes } = require('sequelize');
const { sequelize } = require("../index")
const Oink = require("./Oink")
const User = require("./User")

const LikedOinks = sequelize.define("likedOinks", {
        userId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id"
            }
        },
        oinkId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            references: {
                model: Oink,
                key: "id"
            }
        }
    })

module.exports = LikedOinks