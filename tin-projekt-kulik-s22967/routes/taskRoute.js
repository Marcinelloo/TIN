const express = require("express");
const router = express.Router();

const taskControler = require("../controllers/taskController");

router.get("/", taskControler.showTaskList);
router.get("/add", taskControler.showAddTaskFrom);
router.get("/edit/:taskId", taskControler.showEditTaskFrom);
router.get("/details/:taskId", taskControler.showTaskDetails);

router.post("/add", taskControler.addTask);
router.post("/edit", taskControler.updateTask);
router.get("/delete/:taskId", taskControler.deleteTask);

module.exports = router;
