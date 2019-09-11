const db = require("./db");
const Restaurant = require("./models/Restaurant");
const OmniRating = require("./models/OmniRating");
const User = require("./models/User");

OmniRating.belongsTo(Restaurant);
Restaurant.hasMany(OmniRating);

module.exports = {
  db,
  models: {
    Restaurant,
    OmniRating,
    User
  }
};
