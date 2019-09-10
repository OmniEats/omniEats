const router = require('express').Router()

router.use('/google', require('./googleMaps'))
router.use('/omniEats', require('./omniEats'))

module.exports = router
