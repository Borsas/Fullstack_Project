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
Oink.belongsTo(User)


module.exports = User