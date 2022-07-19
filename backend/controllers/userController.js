const User = require("../models/User");

const usernameExists = async (username) => {
  return (await User.countDocuments({ username })) > 0;
};

const populateUserData = (user) => {
  return {
    username: user.username,
    exerciseList: user.exerciseList,
  };
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

// login and return user
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.send({ error: "both username and password required" });
  }
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.send({
      error: "no such username and password combination found",
    });
  }
  return res.send({ user: populateUserData(user) });
};

// register and return new user
const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.send({ error: "both username and password required" });
  }
  const nameExists = await usernameExists(username);
  console.log(nameExists);
  if (nameExists) {
    console.log("name exists");
    return res.send({ error: "usename is not available" });
  }
  try {
    const user = new User({ username, password });
    await user.save();
    return res.send({ user: populateUserData(user) });
  } catch (err) {
    console.log(err);
    return res.send({
      error:
        "an error occurred trying to register user. please try again next time.",
    });
  }
};

module.exports = {
  login,
  saveWorkout,
  register,
};
