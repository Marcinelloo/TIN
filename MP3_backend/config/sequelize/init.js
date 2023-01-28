const sequelize = require("./sequelize");

const Employee = require("../../model/sequelize/Employee");
const Task = require("../../model/sequelize/Task");
const EmployeeTask = require("../../model/sequelize/EmployeeTask");

module.exports = () => {
  Employee.hasMany(EmployeeTask, {
    as: "employeetask",
    foreignKey: { name: "emp_id", allowNull: false },
    constraints: true,
    onDelete: "CASCADE",
  });
  EmployeeTask.belongsTo(Employee, {
    as: "employee",
    foreignKey: { name: "emp_id", allowNull: false },
  });
  Task.hasMany(EmployeeTask, {
    as: "employeetask",
    foreignKey: { name: "tsk_id", allowNull: false },
    constraints: true,
    onDelete: "CASCADE",
  });
  EmployeeTask.belongsTo(Task, {
    as: "tasks",
    foreignKey: { name: "tsk_id", allowNull: false },
  });

  let allEmps, allTasks;
  return sequelize
    .sync({ force: true })
    .then(() => {
      return Employee.findAll();
    })
    .then((emps) => {
      if (!emps || emps.length === 0) {
        return Employee.bulkCreate([
          {
            firstName: "Jan",
            lastName: "kowalski",
            active: true,
            email: "kowalski@wp.pl",
            password: "123456",
          },
          {
            firstName: "Jan",
            lastName: "Bakowski",
            active: true,
            email: "kowalski1@wp.pl",
            password: "12345678",
          },
          {
            firstName: "Jan",
            lastName: "Sasowski",
            active: true,
            email: "kowalski2@wp.pl",
            password: "12345678",
          },
        ]).then(() => {
          return Employee.findAll();
        });
      } else {
        return emps;
      }
    })
    .then((emps) => {
      allEmps = emps;
      return Task.findAll();
    })
    .then((tasks) => {
      if (!tasks || tasks.length === 0) {
        return Task.bulkCreate([
          {
            title: "smieszne",
            created: "2022-10-10",
            dueTo: "2022-10-10",
            description: "to jest wlasnie super zadanie",
          },
          {
            title: "smieszne2",
            created: "2022-10-10",
            dueTo: "2022-10-10",
            description: "to jest wlasnie super zadanie2",
          },
        ]).then(() => {
          return Task.findAll();
        });
      } else {
        return tasks;
      }
    })
    .then((tasks) => {
      allTasks = tasks;
      return EmployeeTask.findAll();
    })
    .then((empTask) => {
      if (!empTask || empTask.length === 0) {
        return EmployeeTask.bulkCreate([
          {
            emp_id: allEmps[0]._id,
            tsk_id: allTasks[0]._id,
            status: "created",
            comment: "super kom1",
          },
          {
            emp_id: allEmps[1]._id,
            tsk_id: allTasks[1]._id,
            status: "created",
            comment: "super kom2",
          },
          {
            emp_id: allEmps[2]._id,
            tsk_id: allTasks[0]._id,
            status: "created3",
            comment: "super kom",
          },
        ]);
      } else {
        return empTask;
      }
    });
};
