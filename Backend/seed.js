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
  } catch (error) {
    console.log(error);
  }
};
module.exports = seed;
