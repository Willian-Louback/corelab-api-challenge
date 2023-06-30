const routes = require("express").Router();
const TaskController = require("../controller/taskController");

routes.get("/", TaskController.init);
routes.get("/getAllTasks", TaskController.getAllTasks);
routes.post("/createTask", TaskController.createTask);
routes.patch("/updateTask", TaskController.updateTask);
routes.patch("/changeTaskStatus", TaskController.changeTaskStatus);
routes.delete("/deleteTask", TaskController.deleteTask);

module.exports = routes;