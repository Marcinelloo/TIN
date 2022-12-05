const express = require("express");
const router = express.Router();

const empTaskApiController = require("../../api/EmployeeTaskAPI");

router.get("/", empTaskApiController.getEmployeesTasks);
router.get("/:employeeTaskId", empTaskApiController.getEmployeeTaskById);
router.post("/", empTaskApiController.createEmployeeTask);
router.put("/:employeeTaskId", empTaskApiController.updateEmployeeTask);
router.delete("/:employeeTaskId", empTaskApiController.deleteEmployeeTask);

module.exports = router;
