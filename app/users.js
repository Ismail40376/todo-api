const express = require("express");
const User = require("../models/user-model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const user = new User(req.body);
    await user.save();
    const token = user.generateJWT();
    return res.status(201).send({ user, token });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.post("/sessions", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "username not found" });
    }
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(404).send({ error: "password is wrong" });
    }
    const token = user.generateJWT();
    return res.send({ message: "Authenticated", user, token });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
module.exports = router;
