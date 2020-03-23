//


function getValidAlerts(id, callback){

    const request = new XMLHttpRequest()

    let url = '/api/weather/' + id
    request.open('GET', url, true)
    request.onload = function() {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            if(data.valid == 1){
                callback( true )
            }
            else {
                callback( false )
            }

        } else {
            console.log('error')
        }
    }
    request.send()
    // console.log('Updated weather alerts ' + new Date())
    // console.log(plotableNOAAalerts)
}


function getAllValidAlerts(id, callback){
    const request = new XMLHttpRequest()

    let url = '/api/weather/' + id
    request.open('GET', url, true)
    request.onload = function() {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
 
            callback(data)

        } else {
            console.log('error')
        }
    }
    request.send()
    // console.log('Updated weather alerts ' + new Date())
    // console.log(plotableNOAAalerts)
}
