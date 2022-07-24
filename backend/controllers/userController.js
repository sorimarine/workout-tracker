const User = require("../models/User");

const usernameExists = async (username) => {
  return (await User.countDocuments({ username })) > 0;
};

const populateUserData = (user, ...otherKeys) => {
  const userData = {
    username: user.username,
    exerciseList: user.exerciseList,
  };
  otherKeys.map((key) => {
    if (user[key]) {
      userData[key] = user[key];
    }
  });
  return userData;
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
  req.session.user = populateUserData(user, "workouts");
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
    req.session.user = populateUserData(user, "workouts");
    return res.send({ user: populateUserData(user) });
  } catch (err) {
    console.log(err);
    return res.send({
      error:
        "an error occurred trying to register user. please try again next time.",
    });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  return res.send();
};

const authUser = (req, res) => {
  const user = req.session?.user;
  return res.send(user ? { user: populateUserData(user) } : {});
};

const saveWorkout = async (req, res) => {
  try {
    // update the workouts and exerciseList info to session
    // and save it to the database
    const { username, exerciseList, workout } = req.body;
    req.session.user.exerciseList = exerciseList;
    req.session.user.workouts.push(workout);
    const user = await User.findOne({ username });
    user.workouts = req.session.user.workouts;
    user.exerciseList = req.session.user.exerciseList;
    user.save();
    res.send({ user: populateUserData(user) });
  } catch (err) {
    res.status(404).send("error saving workout:", err);
  }
};

const compareDates = (dateString1, dateString2) => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  return date1 > date2 ? 1 : date2 > date1 ? -1 : 0;
};

const getWorkouts = async (req, res) => {
  const user = req.session?.user;
  if (!user) {
    return res.send({ error: "An error occurred" });
  }
  const dateRange = req.query.dateRange
    ? JSON.parse(req.query.dateRange)
    : null;
  if (!dateRange?.from || !dateRange?.to) {
    console.log(dateRange.from, dateRange.to);
    return res.send({ error: "Please select both from and two date ranges" });
  }
  if (compareDates(dateRange.from, dateRange.to) > 0) {
    return res.send({ error: "From date needs to be before To date" });
  }
  const workouts = user.workouts
    ? user.workouts.filter(
        (workout) =>
          compareDates(workout.date, dateRange.from) >= 0 &&
          compareDates(workout.date, dateRange.to) <= 0
      )
    : [];
  return res.send({ workouts });
};

module.exports = {
  login,
  saveWorkout,
  register,
  logout,
  authUser,
  getWorkouts,
};
