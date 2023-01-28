const Employee = require("../../model/sequelize/Employee");
const EmployeeTask = require("../../model/sequelize/EmployeeTask");
const Task = require("../../model/sequelize/Task");

exports.findByEmail = (email) => {
  return Employee.findOne({ where: { email: email } });
};
exports.getEmployees = () => {
  return Employee.findAll();
};

exports.getEmployeeById = (empId) => {
  return Employee.findByPk(empId, {
    include: [
      {
        model: EmployeeTask,
        as: "employeetask",
        include: [
          {
            model: Task,
            as: "tasks",
          },
        ],
      },
    ],
  });
};

exports.createEmployee = (newEmpData) => {
  return Employee.create({
    firstName: newEmpData.firstName,
    lastName: newEmpData.lastName,
    active: newEmpData.active === "on" ? true : false,
    email: newEmpData.email,
    password: newEmpData.password,
  });
};

exports.updateEmployee = (empId, empData) => {
  empData.active = empData.active === "on" ? true : false;
  return Employee.update(empData, {
    where: { _id: empId },
    individualHooks: true,
  });
};
exports.deleteEmployee = (empId) => {
  return Employee.destroy({
    where: { _id: empId },
  });
};
