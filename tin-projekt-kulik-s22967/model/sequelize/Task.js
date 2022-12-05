const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Task = sequelize.define("Task", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
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
  created: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane",
      },
    },
  },
  dueTo: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane",
      },
    },
  },
  description: {
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
});

module.exports = Task;
