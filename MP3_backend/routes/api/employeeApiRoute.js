const express = require("express");
const isAuth = require("../../middleware/isAuth");

const router = express.Router();

const empApiController = require("../../api/EmployeeAPI");

router.get("/", empApiController.getEmployees);
router.get("/:empId", isAuth, empApiController.getEmployeeById);
router.post("/", isAuth, empApiController.createEmployee);
router.put("/:empId", isAuth, empApiController.updateEmployee);
router.delete("/:empId", isAuth, empApiController.deleteEmployee);

module.exports = router;
