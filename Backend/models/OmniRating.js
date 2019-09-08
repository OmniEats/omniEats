const Sequelize = require('sequelize');
const  db  = require('../db');

const OmniRating = db.define('omniRating', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  score: {
    type: Sequelize.ENUM('Vegetarian', 'Half-Half', 'Meat Lovers'),
    allowNull: false
  }
});

module.exports = OmniRating;
