const router = require('express').Router()
const googleMaps = require('@google/maps').createClient({Promise: Promise, key: process.env.MAPKEY })

router.get('/',  (req, res, next) => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            const currentLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        })
    } else {
        console.error("Your Device isn't Support Must Have A GPS Module")
    }
})

module.exports = router