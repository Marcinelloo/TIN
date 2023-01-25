const TaskRepository = require("../repository/sequelize/TaskRepository");

exports.getTask = (req, res, next) => {
  TaskRepository.getTasks()
    .then((emps) => {
      res.status(200).json(emps);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getTaskById = (req, res, next) => {
  const taskId = req.params.taskId;

  TaskRepository.getTaskById(taskId)
    .then((emp) => {
      if (!emp) {
        res.status(404).json({
          message: "Task with id:" + taskId + " not found",
        });
      } else res.status(200).json(emp);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.createTask = (req, res, next) => {
  const body = req.body;

  TaskRepository.createTask(body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateTask = (req, res, next) => {
  const body = req.body;
  const taskId = req.params.taskId;

  TaskRepository.updateTask(taskId, body)
    .then((result) => {
      res.status(200).json({ message: "Task updated!", task: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;

  TaskRepository.deleteTask(taskId)
    .then((result) => {
      res.status(200).json({ message: "Task removed!", task: result });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
