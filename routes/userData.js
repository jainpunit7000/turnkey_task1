// Importing express and router for Routing
const express = require('express');
const router = express.Router();

//getting controller
const userDataController = require('../controllers/userData');

// get user details
router.get("/data", userDataController.getUserData);

module.exports = router;