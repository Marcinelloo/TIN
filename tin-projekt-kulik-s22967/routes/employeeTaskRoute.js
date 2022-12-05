const express = require("express");
const router = express.Router();

const employeeTaskController = require("../controllers/employeeTaskController");

router.get("/", employeeTaskController.showEmployeeTaskList);
router.get("/add", employeeTaskController.showAddEmployeeTaskFrom);
router.get("/edit/:empTaskId", employeeTaskController.showEmployeeTaskEdit);
router.get(
  "/details/:empTaskId",
  employeeTaskController.showEmployeeTaskDetails
);

router.post("/add", employeeTaskController.addEmployeeTask);
router.post("/edit", employeeTaskController.updateEmployeeTask);
router.get("/delete/:empTaskId", employeeTaskController.deleteEmployeeTask);

module.exports = router;
