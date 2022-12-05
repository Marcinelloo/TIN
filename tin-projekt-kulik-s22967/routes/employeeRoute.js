const express = require("express");
const router = express.Router();

const employeeControler = require("../controllers/employeeController");

router.get("/", employeeControler.showEmployeeList);
router.get("/add", employeeControler.showAddEmployeeFrom);
router.get("/edit/:empId", employeeControler.showEditEmployeeFrom);
router.get("/details/:empId", employeeControler.showEmployeeDetails);

router.post("/add", employeeControler.addEmployee);
router.post("/edit", employeeControler.updateEmployee);
router.get("/delete/:empId", employeeControler.deleteEmployee);

module.exports = router;
