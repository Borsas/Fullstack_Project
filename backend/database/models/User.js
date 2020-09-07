const { DataTypes } = require('sequelize');
const { sequelize } = require("../index")


const User = sequelize.define("user", {
        username: {
            allowNull: false,
            type: DataTypes.STRING
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

module.exports = User