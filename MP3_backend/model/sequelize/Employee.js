const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");
const bcrypt = require("bcryptjs");

const Employee = sequelize.define(
  "Employee",
  {
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
          args: [6, 60],
          msg: "Pole powinno zawierac od 10 do 60 znakow",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        // console.log("aaaaa");

        console.log(user);

        if (user.password) {
          var salt = bcrypt.genSaltSync(10);

          user.dataValues.password = bcrypt.hashSync(user.password, 10);

          // console.log(user.password);
          // console.log(hash);

          // bcrypt.compare(hash, "1234567890", function (err, result) {
          //   if (err) {
          //     console.log(err);

          //     throw err;
          //   }
          //   // console.log(result);
          // });
        }
      },
      beforeUpdate: (user) => {
        if (user.password) {
          user.dataValues.password = bcrypt.hashSync(user.password, 10);
        }
      },
      beforeBulkCreate: (users) => {
        users.forEach((user) => {
          user.dataValues.password = bcrypt.hashSync(user.password, 10);
        });
      },
    },
  }
);

Employee.prototype.validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};

module.exports = Employee;
