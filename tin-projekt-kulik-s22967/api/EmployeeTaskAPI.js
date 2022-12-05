const EmployeeTaskRepostiory = require("../repository/sequelize/EmployeeTaskRepostiory");

exports.getEmployeesTasks = (req, res, next) => {
  EmployeeTaskRepostiory.getEmployeesTasks()
    .then((emps) => {
      res.status(200).json(emps);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getEmployeeTaskById = (req, res, next) => {
  const employeeTaskId = req.param.employeeTaskId;

  EmployeeTaskRepostiory.getTaskById(employeeTaskId)
    .then((emp) => {
      if (!emp) {
        res.status(404).json({
          message: "EmployeeTask with id:" + employeeTaskId + " not found",
        });
      } else res.status(200).json(emp);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.createEmployeeTask = (req, res, next) => {
  const body = req.body;

  EmployeeTaskRepostiory.createEmployeeTask(body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateEmployeeTask = (req, res, next) => {
  const body = req.body;
  const employeeTaskId = req.param.employeeTaskId;

  EmployeeTaskRepostiory.updateEmployeeTask(employeeTaskId, body)
    .then((result) => {
      res
        .status(200)
        .json({ message: "EmployeeTask updated!", employeeTask: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteEmployeeTask = (req, res, next) => {
  const employeeTaskId = req.param.employeeTaskId;

  EmployeeTaskRepostiory.deleteEmployeeTask(employeeTaskId)
    .then((result) => {
      res.status(200).json({ message: "EmployeeTask removed!", task: result });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
