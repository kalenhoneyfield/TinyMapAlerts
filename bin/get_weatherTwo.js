const restify = require('restify-clients')
const assert = require('assert')
const {Sequelize, Op} = require('sequelize')

const weatherAlerts = require('../models/weatherModel')

module.exports = (callback => {

    // Creates a JSON client
const client = restify.createJsonClient({
    url: 'https://api.weather.gov'
  })

const options = {
        path: '/alerts/active?status=actual&region_type=land',
        headers: {
            'User-Agent': 'TinyMap',
            'Content-Type': 'application/json'
    },
        retry: {
            'retries': 0
    }
}

client.get(options, (err, req, res, obj) => {
    assert.ifError(err)
    console.log(`NOAA Weather API statusCode: ${res.statusCode}`)
    addAlertsToDB(obj["features"])
  })


    async function addAlertsToDB(data){
    
        let alert
        let created
        for(let i = 0; i < data.length; i++){

            // //fix the null values
            // if( data[i].geometry == null || data[i].geometry == undefined ){
            //     data[i].geometry = { "type": "None" }
            // }

            console.log(data[i].properties.id)
            try {
                [alert, created] = await weatherAlerts.findOrCreate({
                    where: { propertiesId: data[i].properties.id },
                    defaults: {
                        geometry: JSON.stringify( data[i].geometry ),
                        properties: JSON.stringify( data[i].properties ),
                        valid: 1,
                        expires: data[i].properties.expires
                    }
                })
                if (created) {
                    callback(`Alert stored for ${alert.properties.id}`); 
                    }

            } catch (error) {
                callback(error)
            } finally {
                callback('completed')
            }

        }
    }

    weatherAlerts.update({ valid: 0 }, {
        where: {
            expires: 
            {
                [Op.lt] : new Date()
            }
        }
      })
})

