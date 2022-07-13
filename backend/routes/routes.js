const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/saveWorkout", async (req, res) => {
  userController.saveWorkout(req.body, res);
});
router.post("/register", async (req, res) => {
  userController.register(req, res);
});
router.post("/login", async (req, res) => {
  userController.login(req, res);
});

module.exports = router;
