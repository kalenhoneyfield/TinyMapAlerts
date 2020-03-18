//required modules
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

//pull ins
const getAlerts = require('./bin/get_weather')


let alerts = {}

getAlerts((data) => {
    alerts = data
})

setInterval( () => {
        getAlerts((data) => {
            alerts = data
        })
    }, 300000)


const app = express()

app.use(bodyParser.json())

app.use(express.static('html'))

app.get('/', (req, res) => {
    res.json(alerts)
})

let PORT = 3000;

app.listen(PORT, (err) => {
    if(err){
        throw err
    }
    else {
        console.log(`Server running on ${PORT}`)
    }
    
})