import React, { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEmployeeById } from "../../api/repositories/employee";
import { getEmployeeTaskById } from "../../api/repositories/employeeTask";
import EmployeeDetailsData from "../../components/employee-details/EmployeeDetailsData";
import EmployeeTaskDetailsData from "../../components/employee-task-details/EmployeeTaskDetailsData";

function EmployeeTaskDetails() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employeeTask, setEmployeeTask] = useState(null);

  let { id } = useParams();
  id = parseInt(id);

  function fetchEmployeeTaskDetails() {
    getEmployeeTaskById(id)
      .then((res) => {
        return res.json();
      })
      .then(
        (data) => {
          if (data.message) {
            setEmployeeTask(null);
            setError(data.message);
          } else {
            console.log(data);
            setEmployeeTask(data);
            setError(null);
          }
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  let content;

  if (error) {
    content = <p>Error: {error.message}</p>;
  } else if (!isLoaded) {
    content = <p>Loading employee data...</p>;
  } else {
    content = <EmployeeTaskDetailsData employeeTask={employeeTask} />;
  }

  useLayoutEffect(() => {
    fetchEmployeeTaskDetails();
  }, []);

  return (
    <main>
      <h2>Informacje o zadniu pracownika</h2>
      {content}
      <div className="section-buttons">
        <Link to="/employees-tasks" className="list-actions-button-details ">
          Back
        </Link>
      </div>
    </main>
  );
}
export default EmployeeTaskDetails;
