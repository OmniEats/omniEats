const router = require('express').Router();
const { models } = require('../index');
const { Restaurant, OmniRating, User } = models;

router.post('/', async (req, res, next) => {
  try {
    if (req.body.filter.length <= 0) {
    const allRestaurants = await Restaurant.findAll({include: [{model: OmniRating}]});
    res.send(allRestaurants);
    } else {
    const allRestaurants = await Restaurant.findAll({include: [{
        model: OmniRating,
        where: {
          rating: req.body.filter
        }
      }]})
      res.send(allRestaurants);
    }


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
    rRating.onVote(req.body.vote, user)
    user.addOmniRating(rRating)
    res.send(allRestaurants)
  } catch (ex) {
    next(ex.message);
  }
});
module.exports = router;
