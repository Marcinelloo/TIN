import { Link } from "react-router-dom";

function EmployeeTaskListTableRow({ employeeTask, deleteEmployeeTask }) {
  return (
    <tr>
      <td>{employeeTask.employee.firstName}</td>
      <td>{employeeTask.employee.lastName}</td>
      <td>{employeeTask.tasks.title}</td>
      <td>
        <ul className="list-actions">
          <li>
            <Link
              to={`/employees-tasks/details/${employeeTask._id}`}
              className="list-actions-button-details"
            >
              Szczegóły
            </Link>
          </li>
          <li>
            <Link
              to={`/employees-tasks/edit/${employeeTask._id}`}
              className="list-actions-button-edit"
            >
              Edytuj
            </Link>
          </li>
          <li>
            <button
              onClick={(e) => deleteEmployeeTask(e, employeeTask._id)}
              className="list-actions-button-delete"
            >
              Usuń
            </button>
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default EmployeeTaskListTableRow;
