const uuid = require("uuid").v4()
const { DataTypes } = require('sequelize');
const { sequelize } = require("../index")

const Oink = sequelize.define("oink", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING
        },
        content: {
            allowNull: false,
            type: DataTypes.STRING
        },
        likes: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        date: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    })

module.exports = Oink