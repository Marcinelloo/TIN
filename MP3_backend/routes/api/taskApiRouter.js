const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/isAuth");

const taskApiController = require("../../api/TaskApi");

router.get("/", taskApiController.getTask);
router.get("/:taskId", isAuth, taskApiController.getTaskById);
router.post("/", isAuth, taskApiController.createTask);
router.put("/:taskId", isAuth, taskApiController.updateTask);
router.delete("/:taskId", isAuth, taskApiController.deleteTask);

module.exports = router;
