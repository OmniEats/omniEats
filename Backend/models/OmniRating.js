const Sequelize = require('sequelize');
const  db  = require('../db');

const OmniRating = db.define('omniRating', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  ratingsCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  rating: {
    type: Sequelize.ENUM('Vegetarian', 'Half-Half', 'Meat Lovers', 'No Data'),
    defaultValue: 'No Data'
  },
  totalScore: Sequelize.INTEGER
});

OmniRating.prototype.onVote = async function(vote) {
  this.ratingsCount++;
  if (vote === 'yes') {
    this.totalScore++;
  }
  if (vote === 'no') {
    this.totalScore--
  }
  const avgScore = this.totalScore / this.ratingsCount
   if (avgScore >= .33) {
     this.rating = 'yes'
   }
   if (avgScore <= -.33) {
     this.rating = 'no'
   }
   if (avgScore < .33 && avgScore >-.33) {
    this.rating = 'maybe'
   }

  await this.save();
};

module.exports = OmniRating;
