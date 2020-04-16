const restify = require('restify-clients')
const assert = require('assert')
const {Sequelize, Op} = require('sequelize')

const weatherAlerts = require('../models/weatherModel')
const users = require('../models/user')

// users.findAll({}).then((data) => {
//     console.log(data)
// })
// weatherAlerts.update({ valid: 0 }, {
//     where: {
//         expires: 
//         {
//             [Op.lt] : new Date()
//         }
//     }
//   })  
// weatherAlerts.findAll({
//     where: {
//         expires: 
//         {
//             [Op.lt] : new Date()
//             // [Op.lt] : new Date(new Date() - 1000 * 60 * 60 * 24 * 7)
//         }
//     }
//   })  .then((data) => {
//       console.log(data.length)
//   })
weatherAlerts.findAll({
    // where: {
    //     geometry: {
    //         [Op.eq]: 'null'
    //     }
    // }
})  .then((data) => {
      console.log(data.length)
  })

// weatherAlerts.destroy({
//     where: {
//         expires: {
//             [Op.lt] : new Date()
//         }
//     }
// })



