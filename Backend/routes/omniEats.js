const router = require('express').Router();
const { models } = require('../index');
const { Restaurant, OmniRating, User } = models;

router.get('/', async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.findAll();
    res.send(allRestaurants);
  } catch (ex) {
    next(ex);
  }
});

router.post('/rate', async (req, res, next) => {
  try {
    const restaurantRating = await OmniRating.findOrCreate({
      where: {
        restaurantId: req.body.restaurantId
      }
    });
    const user = await User.findByPk(req.session.userId)
    const allRestaurants = await Restaurant.findAll();
    user.addOmniRating(restaurantRating)
    restaurantRating.onVote(req.body.vote)
    res.send(allRestaurants)
  } catch (ex) {
    next(ex.message);
  }
});
module.exports = router;
