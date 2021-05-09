const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/omniEats', {logging: false,  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }})

module.exports = db
