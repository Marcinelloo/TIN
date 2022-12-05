const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Employee = sequelize.define("Employee", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
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
  lastName: {
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
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane",
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane",
      },
      len: {
        args: [3, 60],
        msg: "Pole powinno zawierac od 3 do 20 znakow",
      },
      isEmail: {
        msg: "Pole powinno zawierac prawidlowy adres email",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane",
      },
      len: {
        args: [10, 20],
        msg: "Pole powinno zawierac od 10 do 20 znakow",
      },
    },
  },
});

module.exports = Employee;
