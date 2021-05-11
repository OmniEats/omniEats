const router = require('express').Router();
const { models } = require('../index');
const { Restaurant } = models;
const googleMaps = require('@google/maps').createClient({
  Promise: Promise,
  key: process.env.MAPKEY
});

router.post('/directions', (req, res, next) => {
  const { origin, destination } = req.body;
  googleMaps
    .directions({ origin, destination })
    .asPromise()
    .then(results => res.send(results))
    .catch(err => console.error(err))
});

router.post('/', (req, res, next) => {
  const { latitude, longitude } = req.body;
  const location = { latitude, longitude };
  console.log(location)
  googleMaps
    .placesNearby({ location: location, radius: 1609, type: 'restaurant' })
    .asPromise()
    .then(results => {
      results.json.results.forEach(place => {
        Restaurant.findOrCreate({
          where: {
            googleId: place.place_id
          },
          defaults: {
            name: place.name,
            googleId: place.place_id,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            imgRef: place.photos  ? place.photos[0].photo_reference : null,
            grating: place.rating,
            gUserRatingsTotal: place.user_ratings_total,
            hours: place.opening_hours.open_now,
            vicinity: place.vicinity
          }
        });
      });

      res.send(results.json.results);
    })
    .catch(err => console.error(err));
});



module.exports = router;
