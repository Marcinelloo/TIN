const TaskRepository = require("../repository/sequelize/TaskRepository");

exports.showTaskList = (req, res, next) => {
  TaskRepository.getTasks().then((tasks) => {
    res.render("pages/task/list", { tasks: tasks, navLocation: "task" });
  });
};

exports.showAddTaskFrom = (req, res, next) => {
  res.render("pages/task/form", {
    task: {},
    navLocation: "task",
    pageTitle: "Nowe zadanie",
    formMode: "createNew",
    btnLabel: "Dodaj zadanie",
    formAction: "/tasks/add",
    validationErrors: [],
  });
};

exports.showEditTaskFrom = (req, res, next) => {
  const taskId = req.params.taskId;

  TaskRepository.getTaskById(taskId).then((taskId) => {
    res.render("pages/task/form", {
      task: taskId,
      navLocation: "employee",
      pageTitle: "Edycja pracownika",
      formMode: "edit",
      btnLabel: "Edytuj zadanie",
      formAction: "/tasks/edit",
      validationErrors: [],
    });
  });
};

exports.showTaskDetails = (req, res, next) => {
  const taskId = req.params.taskId;

  TaskRepository.getTaskById(taskId).then((task) => {
    res.render("pages/task/form", {
      task: task,
      navLocation: "task",
      pageTitle: "Szczegóły zadania",
      formMode: "showDetails",
      formAction: "",
      validationErrors: [],
    });
  });
};

exports.addTask = (req, res, next) => {
  const taskData = { ...req.body };
  TaskRepository.createTask(taskData)
    .then((result) => {
      res.redirect("/tasks");
    })
    .catch((err) => {
      res.render("pages/task/form", {
        task: taskData,
        navLocation: "task",
        pageTitle: "Nowe zadanie",
        formMode: "createNew",
        btnLabel: "Dodaj zadanie",
        formAction: "/tasks/add",
        validationErrors: err.errors,
      });
    });
};

exports.updateTask = (req, res, next) => {
  const taskId = req.body._id;
  const taskData = { ...req.body };

  TaskRepository.updateTask(taskId, taskData)
    .then((result) => {
      res.redirect("/tasks");
    })
    .catch((err) => {
      res.render("pages/task/form", {
        task: taskId,
        navLocation: "employee",
        pageTitle: "Edycja pracownika",
        formMode: "edit",
        btnLabel: "Edytuj zadanie",
        formAction: "/tasks/edit",
        validationErrors: err.errors,
      });
    });
};
exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  TaskRepository.deleteTask(taskId).then(() => {
    res.redirect("/tasks");
  });
};
