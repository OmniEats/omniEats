const router = require('express').Router();
const { models } = require('../index');
const { Restaurant } = models;
const googleMaps = require('@google/maps').createClient({
  Promise: Promise,
  key: process.env.MAPKEY
});

router.post('/', (req, res, next) => {
  const { latitude, longitude } = req.body;
  const location = { latitude, longitude };
  googleMaps
    .placesNearby({ location: location, radius: 1609, type: 'restaurant' })
    .asPromise()
    .then(results => {
      results.json.results.forEach(place => {
        Restaurant.findOrCreate({
          where: {
            googleId: place.id
          },
          defaults: {
              name: place.name,
              googleId: place.id,
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng
          }
        })
      });
      res.send(results.json.results);
    })
    .catch(err => console.error(err));
});

module.exports = router;
