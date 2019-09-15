const Sequelize = require("sequelize");
const db = require("../db");

const OmniRating = db.define("omniRating", {
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
    type: Sequelize.ENUM("Vegetarian", "Half-Half", "Meat Lovers", "No Data"),
    defaultValue: "No Data"
  },
  totalScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

OmniRating.prototype.onVote = async function(vote, user) {
  const users = await this.getUsers({ where: {id: user.id} })
  if (users.length === 0) this.ratingsCount++;
  if (vote === "Meat Lovers") {
    this.totalScore++;
  }
  if (vote === "Vegetarian") {
    this.totalScore--;
  }
  const avgScore = this.totalScore / this.ratingsCount;
  if (avgScore >= 0.33) {
    this.rating = "Meat Lovers";
  }
  if (avgScore <= -0.33) {
    this.rating = "Vegetarian";
  }
  if (avgScore < 0.33 && avgScore > -0.33) {
    this.rating = "Half-Half";
  }

  await this.save();
};

module.exports = OmniRating;
