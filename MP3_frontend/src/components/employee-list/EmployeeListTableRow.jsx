import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../common/functions/isAuthenticated";

function EmployeeListTableRow(props) {
  const { t } = useTranslation();
  const emp = props.empData;

  return (
    <tr>
      <td>{emp.firstName}</td>
      <td>{emp.lastName}</td>
      <td>{emp.email}</td>
      {isAuthenticated() && (
        <td>
          <ul className="list-actions">
            <li>
              <Link
                to={`/employees/details/${emp._id}`}
                className="list-actions-button-details"
              >
                {t("list.actions.details")}
              </Link>
            </li>
            <li>
              <Link
                to={`/employees/edit/${emp._id}`}
                className="list-actions-button-edit"
              >
                {t("list.actions.edit")}
              </Link>
            </li>
            <li>
              <button
                onClick={(e) => props.deleteEmployee(e, emp._id)}
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

export default EmployeeListTableRow;
