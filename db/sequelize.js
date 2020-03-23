const Sequelize = require('sequelize')
module.exports = new Sequelize('sqlite:database.sqlite', {
    logging: false
})