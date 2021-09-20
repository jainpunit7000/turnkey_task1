// Importing express and router for Routing
const express = require('express');
const router = express.Router();

//importing auth controller
const authController = require('../controllers/auth');

// post user login
router.post("/login", authController.postLogin);

// post user signUp
router.post("/sign-up", authController.postSignUp);

module.exports = router;