import { Link } from "react-router-dom";
import getFormattedDate from "../../common/functions/getFormattedDate";

function EmployeeDetailsData({ employee }) {
  return (
    <>
      <p>Pracownik: {employee.firstName}</p>
      <p>Zadanie: {employee.lastName} </p>
      <p>Status: {employee.email} </p>
      <p>Comment: {employee.active ? "Tak" : "Nie"} </p>
      <h2>Szczegóły zatrudnienia</h2>
      <table className="table-list">
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Status</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {employee.employeetask.map((employeetask) => (
            <tr key={employeetask._id}>
              <td>
                <Link to={`/tasks/details/${employeetask.tasks._id}`}>
                  {employeetask.tasks.title}
                </Link>
              </td>
              <td> {employeetask.status} </td>
              <td> {employeetask.comment} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default EmployeeDetailsData;
