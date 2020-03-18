const https = require('https')

module.exports = function getAlerts(callback){

    const options = {
        hostname: 'api.weather.gov',
        port: 443,
        path: '/alerts/active?status=actual&region_type=land',
        method: 'GET',
        headers: { 
            'User-Agent': 'TinyMap',
            'Content-Type': 'application/json'
         }
      }
      
      let output = '';

      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        res.setEncoding('utf8')

        res.on('data', (chunk) => {
        output += chunk
        })

        res.on('end', () => {
        let data = JSON.parse(output)

        returnPolies(data)
            })
        })
      
      req.on('error', error => {
        console.error(error)
      })
      
      req.end()

      function returnPolies(data){
        let features = data.features
        let polies = []        
        for(let i = 0; i < features.length; i++){
            if(features[i].geometry){
                polies.push(features[i])
            }
          }
          callback(polies)
        }
}

// const http = require('http');
// const https = require('https');

// /**
//  * getJSON:  RESTful GET request returning JSON object(s)
//  * @param options: http options object
//  * @param callback: callback to pass the results JSON object(s) back
//  */

// module.exports.getJSON = (options, onResult) => {
//   console.log('rest::getJSON');
//   const port = options.port == 443 ? https : http;

//   let output = '';

//   const req = port.request(options, (res) => {
//     console.log(`${options.host} : ${res.statusCode}`);
//     res.setEncoding('utf8');

//     res.on('data', (chunk) => {
//       output += chunk;
//     });

//     res.on('end', () => {
//       let obj = JSON.parse(output);

//       onResult(res.statusCode, obj);
//     });
//   });

//   req.on('error', (err) => {
//     // res.send('error: ' + err.message);
//   });

//   req.end();
// };