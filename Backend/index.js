const db = require('./db');
const Restaurant = require('./models/Restaurant');
const OmniRating = require('./models/OmniRating');
const { User } = require('./models/User');

OmniRating.belongsTo(Restaurant);
Restaurant.hasOne(OmniRating);

OmniRating.belongsToMany(User, { through: 'userOmni' });
User.belongsToMany(OmniRating, { through: 'userOmni' });

module.exports = {
  db,
  models: {
    Restaurant,
    OmniRating,
    User
  }
};
