const { db, models } = require("./index");

const seed = async () => {
  try {
    await db.sync({ force: true });

    await models.User.create({
      firstName: "test",
      lastName: "test",
      password: "test",
      email: "test@test.com"
    });

    await db.close();
  } catch (error) {
    console.log(error);
  }
};
seed();
module.exports = seed;
