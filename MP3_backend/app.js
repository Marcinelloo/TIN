var createError = require("http-errors");
var bodyParser = require("body-parser");
const authApiRouter = require("./routes/api/AuthApiRoute");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const sequelizeInit = require("./config/sequelize/init");

sequelizeInit().catch((err) => {
  console.error(err.message);
});

var indexRouter = require("./routes/index");
const employeeRouter = require("./routes/employeeRoute");
const employeeTaskRoute = require("./routes/employeeTaskRoute");
const taskRoute = require("./routes/taskRoute");
const empApiRouter = require("./routes/api/employeeApiRoute");
const empTaskApiRouter = require("./routes/api/employeeTaskApiRouter");
const taskApiRouter = require("./routes/api/taskApiRouter");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth", authApiRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/api/employees", empApiRouter);
app.use("/api/tasks", taskApiRouter);
app.use("/api/employees-tasks", empTaskApiRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
