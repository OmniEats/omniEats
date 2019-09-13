const db = require('./db');
const Restaurant = require('./models/Restaurant');
const OmniRating = require('./models/OmniRating');
const { User } = require('./models/User');

OmniRating.belongsTo(Restaurant);
Restaurant.hasOne(OmniRating);

<<<<<<< HEAD
OmniRating.belongsToMany(User, {through: 'OmniUser'})
User.belongsToMany(OmniRating, {through: 'OmniUser'} )
=======

OmniRating.belongsToMany(User, { through: 'userOmni' });
User.belongsToMany(OmniRating, { through: 'userOmni' });
>>>>>>> master

module.exports = {
  db,
  models: {
    Restaurant,
    OmniRating,
    User
  }
};
