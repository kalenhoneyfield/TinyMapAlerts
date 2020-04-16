const weatherAlertStyle = {
    fillColor: '#c72058',
    weight: 2,
    opacity: 0.7,
    color: 'black',
    dashArray: '3',
    fillOpacity: 0.2,
    lineJoin: 'bevel'
}
let lastPos = {
"lat": getCookie('lat'),
"lng": getCookie("lng"),
"zoom": getCookie("zoom")
}


document.addEventListener("DOMContentLoaded", function(){


const Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
                                maxZoom: 20,
                                attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                                });

const Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
                                    maxZoom: 20,
                                    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                                    });

const OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                maxZoom: 19,
                                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                });

let GEOJSON
// initialize Leaflet
if(!lastPos.lat){
lastPos["lat"] = 0
lastPos["lng"] = 0
lastPos["zoom"] = 2
}
const map = L.map('mapid', {
worldCopyJump: true,
layers: [OpenStreetMap_Mapnik],
center: [lastPos.lat, lastPos.lng],
zoom: lastPos["zoom"],
});

const baseMaps = {
"Default": OpenStreetMap_Mapnik,
"Smooth": Stadia_AlidadeSmooth,
"Smooth Dark": Stadia_AlidadeSmoothDark
};

let NOAALayers = L.layerGroup()

const overlayMaps = {
    "Weather Alerts": NOAALayers
};

L.control.layers(baseMaps, overlayMaps).addTo(map);


// show the scale bar on the lower left corner
L.control.scale().addTo(map);

map.on('mouseup', function(e) {
let zoom = map.getZoom()    
let center = map.getCenter()
// let pip = leafletPip.pointInLayer([e.latlng.lng, e.latlng.lat], plotableNOAAalerts)
// // console.log( pip )
// plotableNOAAalerts.resetStyle()
// for(let i = 0; i< pip.length; i++){
//     pip[i].setStyle({
//         fillColor: 'red',
//         weight: 2,
//         opacity: 1,
//         color: 'black',
//         dashArray: '3',
//         fillOpacity: 0.7
//     })
// }
// let loc = map.locate({setView: true})
// console.log(loc)
setCookie("lat", center.lat, 2)
setCookie("lng", center.lng, 2)
setCookie("zoom", zoom, 2)
console.log( document.cookie )
})

// // show a marker on the map
// L.marker({lon: 0, lat: 0}).bindPopup('The center of the world').addTo(map);
let plotableNOAAalerts = []


setInterval(() => {
getAndPlotAlerts()
}, 30000)
getAndPlotAlerts()

function getAndPlotAlerts(){

const request = new XMLHttpRequest()

request.open('GET', '/api/weather', true)
request.onload = function() {
// Begin accessing JSON data here
let data = JSON.parse(this.response)

if (request.status >= 200 && request.status < 400) {
    // 
    for(let i = 0; i < data.length; i++){
        
        plotableNOAAalerts[i] = L.geoJSON(data[i], {

        filter: function (feature, layer) {

            if(map.hasLayer(plotableNOAAalerts[i])){
                // console.log( plotableNOAAalerts[i] )
                return false
            }
            
            return true
        },

        onEachFeature: onEachAlertFeature
        })
        plotableNOAAalerts[i]["weather"] = true
        
        NOAALayers.addLayer(plotableNOAAalerts[i].setStyle(weatherAlertStyle))
    }
    NOAALayers.addTo(map)

} else {
    console.log('error')
}
}
request.send()

}

setInterval(() => {
map.eachLayer( (layer) => {
if( layer.weather ){
    let id
    Object.keys(layer._layers).forEach((key) => {
        // id = key
        if( !isNaN(layer._layers[key].feature.id) ){
            getValidAlerts(layer._layers[key].feature.id, (data) => {
            if(!data){
                
                map.removeLayer(layer)
            }
            
            })
        }

    })
}


})

}, 30000);


function onEachAlertFeature(feature, layer) {
let popupContent = "<p>" + feature.properties.event + "<br>" +
feature.properties.headline +
"</p>" +
"<p>" + feature.properties.description +
"</p>";

if (feature.properties && feature.properties.popupContent) {
popupContent += feature.properties.popupContent;
}

layer.bindPopup(popupContent);
}
});