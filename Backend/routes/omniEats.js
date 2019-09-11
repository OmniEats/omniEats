const router = require('express').Router()
const { models } = require('../index')
const { Restaurant } = models

router.get('/', async(req, res, next) => {
  try {
    const allRestaurants = await Restaurant.findAll()
    res.send(allRestaurants)
  } catch (ex) {
    next(ex)
  }
})

module.exports = router
