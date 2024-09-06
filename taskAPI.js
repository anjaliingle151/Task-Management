const express = require("express");
const taskController = require("../controller/taskController.js");
const authorize = require('../middleware/authorise.js');
const taskRoutes = express.Router();

taskRoutes.post("/add",authorize,taskController.addTask);
taskRoutes.get('/getAllTasks',authorize,taskController.getAllTasks);
taskRoutes.put('/:id/updatedTask',authorize,taskController.updateTask);
taskRoutes.delete('/:id',authorize,taskController.deleteTask);

module.exports = taskRoutes;