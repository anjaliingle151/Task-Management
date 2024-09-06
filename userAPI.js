const express = require("express");
const userController = require('../controller/userController.js');
const authorize = require('../middleware/authorise.js');
const userRoutes = express.Router();

userRoutes.post('/register',userController.registerUser);
userRoutes.post('/login',userController.loginUser);

module.exports = userRoutes;