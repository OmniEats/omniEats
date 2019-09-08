const { db, models } = require('./index')

const seed = async() => {
  await db.sync({force: true})
}

module.exports = seed
