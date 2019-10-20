const request = require('request')

const forecast = (latitude,longitude,callback) =>{

    const url = 'https://api.darksky.net/forecast/c58f4b508e27b45560cb244946a4337b/'+latitude+','+longitude+'?units=si'
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to loacation services.',undefined)
        }
        else if(body.error){
            callback('Unable to find location,Search for any other location',undefined)
        }
        else{
            callback(undefined,body.daily.summary+'The termperature is '+body.currently.temperature+' degree and '+body.currently.precipProbability+'% chances of rain')
        }
    })
}

module.exports = forecast
