const router = require("express").Router();
const { User } = require("../index");

router.get("/", async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const aUser = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).send(aUser);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const createUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    req.session.userId = newItem.id;
    res.status(201).send(createUser);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updateUser = await User.findByPk(req.params.id);
    updateUser.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
    res.status(200).send(updateUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(404).send("User deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
