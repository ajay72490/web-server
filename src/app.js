const forecast = require('./utils/forecast')
const { geocode, reverseGeocode } = require('./utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3001
//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'ajay'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Flower',
        name: 'Ajay'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'help msg',
        title: 'Help',
        name: 'Ajay'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, foreCastData ) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                foreCastData,
                location,
                address
            })
        })
    })
})

app.get("/weatherCords", (req, res) => {
    const latitude = req.query.latitude
    const longitude = req.query.longitude

    reverseGeocode({ latitude, longitude }, (error, { location } = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                foreCastData,
                location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ajay',
        errorMessage: 'Help article not found'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ajay',
        errorMessage: 'Page not found'

    })
})

app.listen(port, () => {
    console.log('Server has started has successfully at port '+port)
})

