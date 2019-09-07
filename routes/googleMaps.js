const router = require('express').Router()
const googleMaps = require('@google/maps').createClient({Promise: Promise, key: process.env.MAPKEY })

router.get('/',  (req, res, next) => {
    const nearby = googleMaps.placesNearby({location: req.location, key: process.env.MAPKEY, radius: 91.44 })
})

module.exports = router
