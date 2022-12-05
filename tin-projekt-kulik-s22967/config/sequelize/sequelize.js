const Sequlize = require("sequelize");

const sequelize = new Sequlize("TIN", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
