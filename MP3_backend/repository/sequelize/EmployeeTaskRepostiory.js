const { Sequelize } = require("sequelize");
const Employee = require("../../model/sequelize/Employee");
const EmployeeTask = require("../../model/sequelize/EmployeeTask");
const Task = require("../../model/sequelize/Task");
const { Op } = require("sequelize");

exports.getEmployeesTasks = () => {
  return EmployeeTask.findAll({
    include: [
      {
        model: Employee,
        as: "employee",
      },
      {
        model: Task,
        as: "tasks",
      },
    ],
  });
};

exports.getEmployeesTasksByFilter = (userId, status, from, to) => {
  return EmployeeTask.findAll({
    where: {
      status: status,
      emp_id: userId,
      createdAt: { [Op.gte]: new Date(from), [Op.lte]: new Date(to) },
    },
    include: [
      {
        model: Employee,
        as: "employee",
      },
      {
        model: Task,
        as: "tasks",
      },
    ],
  });
};

exports.getEmployeeTaskById = (employeeTaskId) => {
  return EmployeeTask.findByPk(employeeTaskId, {
    include: [
      {
        model: Employee,
        as: "employee",
      },
      {
        model: Task,
        as: "tasks",
      },
    ],
  });
};

exports.createEmployeeTask = (employeeTaskData) => {
  return EmployeeTask.create({
    emp_id: employeeTaskData.emp_id,
    tsk_id: employeeTaskData.tsk_id,
    status: employeeTaskData.status,
    comment: employeeTaskData.comment,
  });
};

exports.updateEmployeeTask = (employeeTaskId, employeeTaskData) => {
  return EmployeeTask.update(employeeTaskData, {
    where: { _id: employeeTaskId },
  });
};

exports.deleteEmployeeTask = (employeeTaskId) => {
  return EmployeeTask.destroy({
    where: { _id: employeeTaskId },
  });
};

exports.deleteManyEmployeeTask = (employeeTaskIds) => {
  return EmployeeTask.destroy({
    _id: { [Sequelize.Op.in]: employeeTaskIds },
  });
};
