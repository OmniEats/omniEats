const router = require('express').Router()
const googleMaps = require('@google/maps').createClient({Promise: Promise, key: process.env.MAPKEY })

router.post('/',  (req, res, next) => {
    const { latitude, longitude } = req.body
    const location = {latitude, longitude}
    googleMaps.placesNearby({location: location, radius: 1649, type: "restaurant" }).asPromise().then(result => res.send(result.json.results))
    .catch(err => console.error(err))
})

module.exports = router
