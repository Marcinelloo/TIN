import { Link } from "react-router-dom";
import { getFormattedDate } from "../../common/functions/getFormattedDate";

function TaskListTableRow({ task, deleteTask }) {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{getFormattedDate(task.created)}</td>
      <td>{getFormattedDate(task.dueTo)}</td>
      <td>{task.description}</td>
      <td>
        <ul className="list-actions">
          <li>
            <Link
              to={`/tasks/details/${task._id}`}
              className="list-actions-button-details"
            >
              Szczegóły
            </Link>
          </li>
          <li>
            <Link
              to={`/tasks/edit/${task._id}`}
              className="list-actions-button-edit"
            >
              Edytuj
            </Link>
          </li>
          <li>
            <button
              onClick={(e) => deleteTask(e, task._id)}
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

export default TaskListTableRow;
