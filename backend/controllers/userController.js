const User = require("../models/User");

const populateUserData = (user) => {
  return {
    username: user.username,
    exerciseList: user.exerciseList,
    workouts: user.workouts,
  };
};
const addUser = async (username, res) => {
  const user = new User({ username: username });
  console.log(user);
  try {
    const addedUser = await user.save();
    res.send(populateUserData(addedUser));
  } catch (e) {
    throw new Error(`error adding user: ${e}`);
  }
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

module.exports = {
  loginUser,
  saveWorkout,
};
