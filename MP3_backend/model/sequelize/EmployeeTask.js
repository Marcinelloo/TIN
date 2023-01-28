const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const EmployeeTask = sequelize.define("EmployeeTask", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  emp_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane",
      },
    },
  },
  tsk_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane",
      },
    },
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane",
      },
      len: {
        args: [5, 60],
        msg: "Pole powinno zawierac od 5 do 60 znakow",
      },
    },
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = EmployeeTask;
