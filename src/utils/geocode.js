const request = require("request")

const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYWpheTQyNTgiLCJhIjoiY2sweG1mZnNoMDZzODNucHJ1c3htYmtxbiJ9.iIt7YkuhuEtv4UFbnNwlLA&limit=1'
    request({ url, json: true },(error, { body })=>{
        if(error){
            callback("Cannot connect to location services",undefined)
        }
        else if( !body.features || body.features.length == 0){
            callback("Unable to find location try another search",undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

const reverseGeocode = ({ latitude, longitude }, callback) => {

    if(!latitude && !longitude) {
        callback("Something went wrong please try again.")
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/ambernath.json?proximity=${latitude},${longitude}&access_token=pk.eyJ1IjoiYWpheTQyNTgiLCJhIjoiY2sweG1mZnNoMDZzODNucHJ1c3htYmtxbiJ9.iIt7YkuhuEtv4UFbnNwlLA&limit=1`
    

    request({ url, json: true }, (error, { body }) => {

        if(error) {
            callback('Cannot connect to location services', undefined)
        }
        else if( !body.features || body.features.length == 0){
            callback('Unable to find location try another search')
        }
        else{
            callback(undefined, {
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode,
    reverseGeocode
}