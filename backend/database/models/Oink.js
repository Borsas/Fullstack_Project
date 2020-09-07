const { DataTypes } = require('sequelize');
const { sequelize } = require("../index")


const Oink = sequelize.define("Oink", {
        user: {
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
            type: DataTypes.STRING
        }
    })

module.exports = Oink