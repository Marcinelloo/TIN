import { Link } from "react-router-dom";
import getFormattedDate from "../../common/functions/getFormattedDate";

function EmployeeTaskDetailsData({ employeeTask }) {
  return (
    <>
      <p>
        Pracownik:{" "}
        {employeeTask.employee.firstName + " " + employeeTask.employee.lastName}
      </p>
      <p>Zadanie: {employeeTask.tasks.title} </p>
      <p>Status: {employeeTask.status} </p>
      <p>Comment: {employeeTask.comment} </p>
    </>
  );
}

export default EmployeeTaskDetailsData;
