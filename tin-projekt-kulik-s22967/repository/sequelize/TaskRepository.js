const Employee = require("../../model/sequelize/Employee");
const EmployeeTask = require("../../model/sequelize/EmployeeTask");
const Task = require("../../model/sequelize/Task");

exports.getTasks = () => {
  return Task.findAll();
};

exports.getTaskById = (taskId) => {
  return Task.findByPk(taskId, {
    include: [
      {
        model: EmployeeTask,
        as: "employeetask",
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      },
    ],
  });
};

exports.createTask = (taskData) => {
  return Task.create({
    title: taskData.title,
    created: taskData.created,
    dueTo: taskData.dueTo,
    description: taskData.description,
  });
};

exports.updateTask = (taskId, taskData) => {
  return Task.update(taskData, { where: { _id: taskId } });
};

exports.deleteTask = (taskId) => {
  return Task.destroy({
    where: { _id: taskId },
  });
};
