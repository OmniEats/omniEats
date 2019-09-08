const db = require('./db');
const Restaurant = require('./models/Restaurant');
const OmniRating = require('./models/OmniRating')

OmniRating.belongsTo(Restaurant)
Restaurant.hasMany(OmniRating)

module.exports = {
  db,
  models: {
    Restaurant,
    OmniRating
  }
};
