const { Sequelize, DataTypes } = require("sequelize")

const init = async () => {
    // Relax, these are just temporary for the time being :-)
    const sequelize = new Sequelize("postgres://fullstack:fullstack@localhost.com:5432/fullstackDatabase") 
    
    
    sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });
    
    const User = sequelize.define('User', {
        firstName: {
          type: DataTypes.STRING,
        }
      })
    
    await User.sync({force: true})

    const kalle = await User.create({
        firstName: "Kalle"
    })
    console.log(kalle)
}

module.exports = init