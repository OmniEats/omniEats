const Sequelize = require('sequelize');
const  db  = require('../db');

const Restaurant = db.define('restaurant', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  googleId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  imgRef: Sequelize.TEXT,
  imgUrl: Sequelize.TEXT,
  grating: {
    type: Sequelize.DECIMAL
  },
  gUserRatingsTotal: {
    type: Sequelize.DECIMAL
  },
  hours: {type: Sequelize.BOOLEAN},
  vicinity: Sequelize.STRING
});

Restaurant.beforeCreate(restaurantInstance => {
  restaurantInstance.imgUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&maxHeight=500&photoreference=${restaurantInstance.imgRef}&key=${process.env.MAPKEY}`
})


module.exports = Restaurant;
