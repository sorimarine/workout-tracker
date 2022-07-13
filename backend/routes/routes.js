const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");

router.get("/getUser", async (req, res) => {
  const user = await User.findOne({ username: "sorimsam06" });
  console.log(user);
  res.send(user);
});

router.post("/addUser", async (req, res) => {
  const userToAdd = new User(req.body);
  await userToAdd.save();
  res.send("added");
});

router.post("/loginUser", async (req, res) => {
  const username = req.body.username;
  userController.loginUser(username, res);
});

router.post("/saveWorkout", async (req, res) => {
  userController.saveWorkout(req.body, res);
});

module.exports = router;
