const EmployeeTaskRepository = require("../repository/sequelize/EmployeeTaskRepostiory");
const EmployeeRepository = require("../repository/sequelize/EmployeeRepository");
const TaskRepository = require("../repository/sequelize/TaskRepository");

exports.showEmployeeTaskList = (req, res, next) => {
  EmployeeTaskRepository.getEmployeesTasks().then((empsTasks) => {
    res.render("pages/employeeTask/list", {
      empsTasks: empsTasks,
      navLocation: "employeeTask",
    });
  });
};

exports.showAddEmployeeTaskFrom = (req, res, next) => {
  let allEmps;
  EmployeeRepository.getEmployees()
    .then((emps) => {
      allEmps = emps;
      return TaskRepository.getTasks();
    })
    .then((tasks) => {
      res.render("pages/employeeTask/form", {
        empTask: {},
        allTasks: tasks,
        allEmps: allEmps,
        navLocation: "employeeTask",
        pageTitle: "Nowe zadanie pracownika",
        formMode: "createNew",
        btnLabel: "Dodaj zadanie pracownika",
        formAction: "/employees-tasks/add",
        validationErrors: [],
      });
    });
};

exports.showEmployeeTaskEdit = (req, res, next) => {
  const empTaskId = req.params.empTaskId;

  let allEmps, allTasks;
  EmployeeRepository.getEmployees()
    .then((emps) => {
      allEmps = emps;
      return TaskRepository.getTasks();
    })
    .then((tasks) => {
      allTasks = tasks;
      return EmployeeTaskRepository.getEmployeeTaskById(empTaskId);
    })
    .then((empsTasks) => {
      res.render("pages/employeeTask/form", {
        empTask: empsTasks,
        allTasks: allTasks,
        allEmps: allEmps,
        navLocation: "employeeTask",
        pageTitle: "Edycja zadanie pracownika",
        formMode: "edit",
        btnLabel: "Edytuj zadanie pracownika",
        formAction: "/employees-tasks/edit",
        validationErrors: [],
      });
    });
};
exports.showEmployeeTaskDetails = (req, res, next) => {
  const empTaskId = req.params.empTaskId;

  let allEmps, allTasks;
  EmployeeRepository.getEmployees()
    .then((emps) => {
      allEmps = emps;
      return TaskRepository.getTasks();
    })
    .then((tasks) => {
      allTasks = tasks;
      return EmployeeTaskRepository.getEmployeeTaskById(empTaskId);
    })
    .then((empsTasks) => {
      res.render("pages/employeeTask/form", {
        empTask: empsTasks,
        allTasks: allTasks,
        allEmps: allEmps,
        navLocation: "employeeTask",
        pageTitle: "Szczegóły zadania",
        formMode: "showDetails",
        formAction: "",
        validationErrors: [],
      });
    });
};

exports.addEmployeeTask = (req, res, next) => {
  const empTaskData = { ...req.body };
  console.log(empTaskData)

  EmployeeTaskRepository.createEmployeeTask(empTaskData)
    .then((result) => {
      res.redirect("/employees-tasks");
    })
    .catch((err) => {
      let allEmps;

      EmployeeRepository.getEmployees()
        .then((emps) => {
          allEmps = emps;
          return TaskRepository.getTasks();
        })
        .then((tasks) => {
          res.render("pages/employeeTask/form", {
            empTask: empTaskData,
            allTasks: tasks,
            allEmps: allEmps,
            navLocation: "employeeTask",
            pageTitle: "Nowe zadanie pracownika",
            formMode: "createNew",
            btnLabel: "Dodaj zadanie pracownika",
            formAction: "/employees-tasks/add",
            validationErrors: err.errors,
          });
        });
    });
};

exports.updateEmployeeTask = (req, res, next) => {
  const empTaskId = req.body._id;
  const empTaskData = { ...req.body };

  console.log(empTaskData)

  EmployeeTaskRepository.updateEmployeeTask(empTaskId, empTaskData)
    .then((result) => {
      res.redirect("/employees-tasks");
    })
    .catch((err) => {
      let allEmps;

      EmployeeRepository.getEmployees()
        .then((emps) => {
          allEmps = emps;
          return TaskRepository.getTasks();
        })
        .then((tasks) => {

          res.render("pages/employeeTask/form", {
            empTask: empTaskData,
            allTasks: tasks,
            allEmps: allEmps,
            navLocation: "employeeTask",
            pageTitle: "Edycja zadanie pracownika",
            formMode: "edit",
            btnLabel: "Edytuj zadanie pracownika",
            formAction: "/employees-tasks/edit",
            validationErrors: err.errors,
          });
        });
    });
};
exports.deleteEmployeeTask = (req, res, next) => {
  const empTaskId = req.params.empTaskId;
  EmployeeTaskRepository.deleteEmployeeTask(empTaskId).then(() => {
    res.redirect("/employees-tasks");
  });
};
