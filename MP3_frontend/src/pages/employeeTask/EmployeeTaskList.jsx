import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  deleteEmployeeApiCall,
  getEmployees,
} from "../../api/repositories/employee";
import {
  deleteEmployeeTaskApiCall,
  getEmployeeTask,
} from "../../api/repositories/employeeTask";
import { isAuthenticated } from "../../common/functions/isAuthenticated";
import EmployeeListTable from "../../components/employee-list/EmployeeListTable";
import EmployeeListTableRow from "../../components/employee-list/EmployeeListTableRow";
import EmployeeTaskListTable from "../../components/employee-task-list/EmployeeTaskListTable";

const EmployeeTaskList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employeesTasks, setEmployeesTask] = useState([]);

  const { t } = useTranslation();

  function fetchEmployeeTaskList() {
    getEmployeeTask()
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setEmployeesTask(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function deleteEmployeeTask(e, id) {
    e.preventDefault();
    console.log(id);
    deleteEmployeeTaskApiCall(id)
      .then((res) => res.json())
      .then(
        (data) => {
          fetchEmployeeTaskList();
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  let content;

  if (error) {
    content = <p>Błąd: {error.message}</p>;
  } else if (!isLoaded) {
    content = <p>Ładowanie danych pracowników...</p>;
  } else {
    content = (
      <EmployeeTaskListTable
        employeeTasks={employeesTasks}
        deleteEmployeeTask={deleteEmployeeTask}
      />
    );
  }

  useLayoutEffect(() => {
    fetchEmployeeTaskList();
  }, []);

  return (
    <main>
      <h2>{t("list.title.employeeTasks")}</h2>
      {content}
      {isAuthenticated() && (
        <p className="section-buttons">
          <Link to="/employees-tasks/add" className="button-add">
            {t("list.actions.add.employeeTasks")}
          </Link>
        </p>
      )}
    </main>
  );
};

export default EmployeeTaskList;
