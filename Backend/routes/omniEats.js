const router = require('express').Router();
const { models } = require('../index');
const { Restaurant, OmniRating, User } = models;

router.get('/', async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.findAll({include: [{model: OmniRating}]});
    res.send(allRestaurants);
  } catch (ex) {
    next(ex);
  }
});

router.post('/rate', async (req, res, next) => {
  try {
   await OmniRating.findOrCreate({
      where: {
        restaurantId: req.body.restaurantId
      }
    });
    const rRating = await OmniRating.findOne({
      where: {
        restaurantId: req.body.restaurantId
      }
    })
    const user = await User.findByPk(req.session.userId)
    const allRestaurants = await Restaurant.findAll();
    user.addOmniRating(rRating)
    rRating.onVote(req.body.vote)
    res.send(allRestaurants)
  } catch (ex) {
    next(ex.message);
  }
});
module.exports = router;
