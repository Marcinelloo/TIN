const EmployeeRepository = require("../repository/sequelize/EmployeeRepository");

exports.showEmployeeList = (req, res, next) => {
  EmployeeRepository.getEmployees().then((emps) => {
    res.render("pages/employee/list", { emps: emps, navLocation: "employee" });
  });
};

exports.showAddEmployeeFrom = (req, res, next) => {
  res.render("pages/employee/form", {
    emp: {},
    navLocation: "employee",
    pageTitle: "Nowy pracownik",
    formMode: "createNew",
    btnLabel: "Dodaj pracownika",
    formAction: "/employees/add",
    validationErrors: [],
  });
};

exports.showEditEmployeeFrom = (req, res, next) => {
  const empId = req.params.empId;

  EmployeeRepository.getEmployeeById(empId).then((emp) => {
    res.render("pages/employee/form", {
      emp: emp,
      navLocation: "employee",
      pageTitle: "Edycja pracownika",
      formMode: "edit",
      btnLabel: "Edytuj pracownika",
      formAction: "/employees/edit",
      validationErrors: [],
    });
  });
};

exports.showEmployeeDetails = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getEmployeeById(empId).then((emp) => {
    res.render("pages/employee/form", {
      emp: emp,
      navLocation: "employee",
      pageTitle: "Szczegoly pracownika",
      formMode: "showDetails",
      formAction: "",
      validationErrors: [],
    });
  });
};

exports.addEmployee = (req, res, next) => {
  const empData = { ...req.body };
  EmployeeRepository.createEmployee(empData)
    .then((result) => {
      res.redirect("/employees");
    })
    .catch((err) => {
      res.render("pages/employee/form", {
        emp: {},
        navLocation: "employee",
        pageTitle: "Nowy pracownik",
        formMode: "createNew",
        btnLabel: "Dodaj pracownika",
        formAction: "/employees/add",
        validationErrors: err.errors,
      });
    });
};

exports.updateEmployee = (req, res, next) => {
  const empId = req.body._id;
  const empData = { ...req.body };

  EmployeeRepository.updateEmployee(empId, empData)
    .then((result) => {
      res.redirect("/employees");
    })
    .catch((err) => {
      res.render("pages/employee/form", {
        emp: empData,
        navLocation: "employee",
        pageTitle: "Edycja pracownika",
        formMode: "edit",
        btnLabel: "Edytuj pracownika",
        formAction: "/employees/edit",
        validationErrors: err.errors,
      });
    });
};
exports.deleteEmployee = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.deleteEmployee(empId).then(() => {
    res.redirect("/employees");
  });
};
