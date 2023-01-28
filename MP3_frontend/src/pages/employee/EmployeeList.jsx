import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  deleteEmployeeApiCall,
  getEmployees,
} from "../../api/repositories/employee";
import { isAuthenticated } from "../../common/functions/isAuthenticated";
import EmployeeListTable from "../../components/employee-list/EmployeeListTable";
import EmployeeListTableRow from "../../components/employee-list/EmployeeListTableRow";

const EmployeeList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);
  const { t } = useTranslation();

  function fetchEmployeeList() {
    getEmployees()
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setEmployees(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function deleteEmployee(e, id) {
    e.preventDefault();
    deleteEmployeeApiCall(id)
      .then((res) => res.json())
      .then(
        (data) => {
          fetchEmployeeList();
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
      <EmployeeListTable empList={employees} deleteEmployee={deleteEmployee} />
    );
  }

  useLayoutEffect(() => {
    fetchEmployeeList();
  }, []);

  return (
    <main>
      <h2>{t("list.title.employees")}</h2>

      {content}
      {isAuthenticated() && (
        <p className="section-buttons">
          <Link to="/employees/add" className="button-add">
            {t("list.actions.add.employees")}
          </Link>
        </p>
      )}
    </main>
  );
};

export default EmployeeList;
