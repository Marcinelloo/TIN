import { Link } from "react-router-dom";

function EmployeeListTableRow(props) {
  const emp = props.empData;

  return (
    <tr>
      <td>{emp.firstName}</td>
      <td>{emp.lastName}</td>
      <td>{emp.email}</td>
      <td>
        <ul className="list-actions">
          <li>
            <Link
              to={`/employees/details/${emp._id}`}
              className="list-actions-button-details"
            >
              Szczegóły
            </Link>
          </li>
          <li>
            <Link
              to={`/employees/edit/${emp._id}`}
              className="list-actions-button-edit"
            >
              Edytuj
            </Link>
          </li>
          <li>
            <button
              onClick={(e) => props.deleteEmployee(e, emp._id)}
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

export default EmployeeListTableRow;
