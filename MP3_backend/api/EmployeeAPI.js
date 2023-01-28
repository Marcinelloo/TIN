const EmployeeeRepository = require("../repository/sequelize/EmployeeRepository");

exports.getEmployees = (req, res, next) => {
  EmployeeeRepository.getEmployees()
    .then((emps) => {
      res.status(200).json(emps);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getEmployeeById = (req, res, next) => {
  const empId = req.params.empId;

  EmployeeeRepository.getEmployeeById(empId)
    .then((emp) => {
      if (!emp) {
        res.status(404).json({
          message: "Employee with id:" + empId + " not found",
        });
      } else res.status(200).json(emp);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.createEmployee = (req, res, next) => {
  const body = req.body;
  console.log(body);

  EmployeeeRepository.createEmployee(body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateEmployee = (req, res, next) => {
  const body = req.body;
  const empId = req.params.empId;
  console.log(body);

  EmployeeeRepository.updateEmployee(empId, body)
    .then((result) => {
      res.status(200).json({ message: "Employee updated!", emp: result });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteEmployee = (req, res, next) => {
  const empId = req.params.empId;

  EmployeeeRepository.deleteEmployee(empId)
    .then((result) => {
      res.status(200).json({ message: "Employee removed!", emp: result });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
