import { Link } from "react-router-dom";
import { getFormattedDate } from "../../common/functions/getFormattedDate";

function TaskDetailsData({ task }) {
  return (
    <>
      <p>Tytuł: {task.title}</p>
      <p>Data zakończenia: {getFormattedDate(task.created)} </p>
      <p>Data Stworzenia: {getFormattedDate(task.dueTo)} </p>
      <p>Opis: {task.description} </p>
      <h2>Szczegóły zatrudnienia</h2>
      <table className="table-list">
        <thead>
          <tr>
            <th>Imie i Nazwisko</th>
            <th>Status</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {task.employeetask.map((employeetask) => (
            <tr key={employeetask._id}>
              <td>
                <Link to={`/employees/details/${employeetask.employee._id}`}>
                  {`${employeetask.employee.firstName}  ${employeetask.employee.lastName}`}
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

export default TaskDetailsData;
