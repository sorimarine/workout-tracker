const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/saveWorkout", async (req, res) => {
  userController.saveWorkout(req.body, res);
});

module.exports = router;
