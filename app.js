//required modules
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const Sequelize = require('sequelize')
const sequelize = require('./db/sequelize')


//routes
const baseRoute = require('./routes/index')
const mapRoute = require('./routes/map')

//pull ins
const getAlerts = require('./bin/get_weatherTwo')

const weatherAlerts = require('./models/weatherModel')

// weatherAlerts.sync()

let alerts = {}

getAlerts((data) => {
    // console.log( data )
})

setInterval( () => {
        getAlerts((data) => {
            // console.log( data )
        })
    }, 300000)


const app = express()

// view engine setup
app.set('view engine', 'hbs')

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}))

app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', baseRoute)
app.get('/map', baseRoute)
app.get('/alerts', baseRoute)

// app.get('/', (req, res) => {
//     res.status(404).send()
// })

app.get('/api/weather', (req, res) => {
    // res.json(alerts)
    weatherAlerts.findAll({
        where: {
            valid: 1
        },
        raw: true,
    }).then( async (data) => {
        for(let i =0; i < data.length; i++){
            data[i]["type"] = "Feature"
            data[i].geometry = JSON.parse( data[i].geometry )
            data[i].properties = JSON.parse( data[i].properties )
        }
        // console.log(data[1])
        res.json(data)
    })
})

app.get('/api/weather/:id', (req, res) => {
    let { id } = req.params
    weatherAlerts.findByPk( id, { raw: true,}
        ).then( async (data) => {
            if(data){
                data["type"] = "Feature"
                data.geometry = JSON.parse( data.geometry )
                data.properties = JSON.parse( data.properties )
                res.json(data)
            }
            else{
                res.status(404).json({"valid": 0})
            }

        
        // console.log(data[1])
        
    })
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

// weatherAlerts.findAll().then((data) => {
//     console.log(data)
// })