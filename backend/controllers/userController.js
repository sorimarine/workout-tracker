const User = require("../models/User");

const populateUserData = (user) => {
  return {
    username: user.username,
    exerciseList: user.exerciseList,
    workouts: user.workouts,
  };
};

const loginUser = async (username, res) => {
  let user;
  try {
    user = await User.findOne({ username: username });
    res.send(populateUserData(user));
  } catch (err) {
    res.status(404).send("user not found");
  }
};

const saveWorkout = async (data, res) => {
  try {
    const user = await User.findOne({ username: data.username });
    user.exerciseList = data.exerciseList;
    user.workouts.push(data.workout);
    user.save();
    res.send(populateUserData(user));
  } catch (err) {
    res.status(404).send("error saving workout:", error);
  }
};

// register new user
const register = async (req, res) => {
  const username = req.body.username;
  if (!username) {
    return res.status(400).send({ message: "username required" });
  }
  const userFound = await User.findOne({ username: req.body.username });
  if (userFound) {
    return res.status(409).send({ message: "username taken" });
  }
  try {
    const newUser = new User({ username: username });
    newUser.save();
    return res.send(populateUserData(newUser));
  } catch (e) {
    return res
      .status(500)
      .send({ message: "error while saving user to database" });
  }
};

module.exports = {
  loginUser,
  saveWorkout,
  register,
};
