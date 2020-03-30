const restify = require('restify-clients')
const assert = require('assert')
const {Sequelize, Op} = require('sequelize')

const weatherAlerts = require('../models/weatherModel')

weatherAlerts.update({ valid: 0 }, {
    where: {
        expires: 
        {
            [Op.lt] : new Date()
        }
    }
  })  



