const db = require('../db');
const Sequelize = require('sequelize');
const crypto = require('crypto');
require('dotenv').config();

const User = db.define('user', {
  id: {
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: Sequelize.UUID
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  googleId: { type: Sequelize.STRING }
});

function hashPassword(password) {
  const secret = process.env.SALT_HASH || 'find some grub';
  return crypto
    .createHmac('sha256', secret)
    .update(password)
    .digest('hex');
}

User.beforeCreate(userInstance => {
  userInstance.password = hashPassword(userInstance.password);
});

User.beforeUpdate(userInstance => {
  userInstance.password = hashPassword(userInstance.password);
});

User.verifyPassword = function(user, password) {
  return user.password === hashPassword(password) ? true : false;
};

module.exports = {
  User,
  hashPassword
};
