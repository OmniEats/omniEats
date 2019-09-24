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

router.post('/slider', async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.findAll({include: {model: OmniRating}});
    const percent = Object.keys(req.body)[0]*1;
    const omniRated = allRestaurants.filter(el => (el.dataValues.omniRating));

    const meat = omniRated.filter(el => (el.dataValues.omniRating.dataValues.rating === 'Meat Lovers'));
    const veggie = omniRated.filter(el => (el.dataValues.omniRating.dataValues.rating === 'Vegetarian'));

    if(percent > 50){
      if (percent <= 60 && percent > 50) res.send(meat.concat(veggie.filter((el, idx) => (idx < 10))));
      else if (percent <= 70 && percent > 60) res.send(meat.concat(veggie.filter((el, idx) => (idx < 7))));
      else if (percent <= 80 && percent > 70) res.send(meat.concat(veggie.filter((el, idx) => (idx < 5))));
      else if (percent <= 90 && percent > 80) res.send(meat.concat(veggie.filter((el, idx) => (idx < 2))));
      else res.send(meat);
    }
    else if(percent === 50){
      res.send(allRestaurants);
    }
    else{
      if (percent < 50 && percent >= 40) res.send(veggie.concat(meat.filter((el, idx) => (idx < 10))));
      else if (percent < 40 && percent >= 30) res.send(veggie.concat(meat.filter((el, idx) => (idx < 7))));
      else if (percent < 30 && percent >= 20) res.send(veggie.concat(meat.filter((el, idx) => (idx < 5))));
      else if (percent < 20 && percent > 10) res.send(veggie.concat(meat.filter((el, idx) => (idx < 2))));
      else res.send(veggie);
    }

  } catch (ex) {
    next(ex);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.findAll({include: [{model: OmniRating}]});
    res.send(allRestaurants);
    }
  catch (ex) {
    next(ex);
  }
});


module.exports = router;
