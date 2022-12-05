const express = require("express");
const router = express.Router();

const taskApiController = require("../../api/TaskApi");

router.get("/", taskApiController.getTask);
router.get("/:taskId", taskApiController.getTaskById);
router.post("/", taskApiController.createTask);
router.put("/:taskId", taskApiController.updateTask);
router.delete("/:taskId", taskApiController.deleteTask);

module.exports = router;
