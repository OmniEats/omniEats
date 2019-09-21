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

router.post('/photos', (req, res, next) => {
  const { query } = req.body
  googleMaps
  .placesPhoto(query)
  .asPromise()
  .then(results => {
    console.log(results)
    res.send(results)
  })
  .catch(err => console.error(err.message))
})

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
            longitude: place.geometry.location.lng,
            imgRef: place.photos.map(photo => photo.photo_reference),
            grating: place.rating,
            gUserRatingsTotal: place.user_ratings_total,
            hours: place.open_now
          }
        });
      });
      res.send(results.json.results);
    })
    .catch(err => console.error(err));
});



module.exports = router;
