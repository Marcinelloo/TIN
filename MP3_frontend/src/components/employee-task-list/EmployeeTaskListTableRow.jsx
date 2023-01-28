import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../common/functions/isAuthenticated";

function EmployeeTaskListTableRow({
  employeeTask,
  deleteEmployeeTask,
  noAction,
}) {
  const { t } = useTranslation();

  return (
    <tr>
      <td>{employeeTask.employee.firstName}</td>
      <td>{employeeTask.employee.lastName}</td>
      <td>{employeeTask.tasks.title}</td>

      {isAuthenticated() && !noAction && (
        <td>
          <ul className="list-actions">
            <li>
              <Link
                to={`/employees-tasks/details/${employeeTask._id}`}
                className="list-actions-button-details"
              >
                {t("list.actions.details")}
              </Link>
            </li>
            <li>
              <Link
                to={`/employees-tasks/edit/${employeeTask._id}`}
                className="list-actions-button-edit"
              >
                {t("list.actions.edit")}
              </Link>
            </li>
            <li>
              <button
                onClick={(e) => deleteEmployeeTask(e, employeeTask._id)}
                className="list-actions-button-delete"
              >
                {t("list.actions.delete")}
              </button>
            </li>
          </ul>
        </td>
      )}
    </tr>
  );
}

export default EmployeeTaskListTableRow;
