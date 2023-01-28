const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/isAuth");
const empTaskApiController = require("../../api/EmployeeTaskAPI");

router.get("/", empTaskApiController.getEmployeesTasks);
router.get(
  "/filter/:status/:from/:to",
  isAuth,
  empTaskApiController.getEmployeesTasksByFilter
);

router.get(
  "/:employeeTaskId",
  isAuth,
  empTaskApiController.getEmployeeTaskById
);
router.post("/", isAuth, empTaskApiController.createEmployeeTask);
router.put("/:employeeTaskId", isAuth, empTaskApiController.updateEmployeeTask);
router.delete(
  "/:employeeTaskId",
  isAuth,
  empTaskApiController.deleteEmployeeTask
);

module.exports = router;
