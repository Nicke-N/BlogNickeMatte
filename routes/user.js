const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// CREATE USER
router.post("/", userController.createUser);

// LOGIN USER

router.post("/login", userController.loginUser);

module.exports = router;