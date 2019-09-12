const router = require('express').Router()

router.use('/google', require('./googleMaps'))
router.use('/omniEats', require('./omniEats'))
router.use('/users', require('./users'))

module.exports = router
