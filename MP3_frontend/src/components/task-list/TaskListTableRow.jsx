import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getFormattedDate } from "../../common/functions/getFormattedDate";
import { isAuthenticated } from "../../common/functions/isAuthenticated";

function TaskListTableRow({ task, deleteTask }) {
  const { t } = useTranslation();

  return (
    <tr>
      <td>{task.title}</td>
      <td>{getFormattedDate(task.created)}</td>
      <td>{getFormattedDate(task.dueTo)}</td>
      <td>{task.description}</td>
      {isAuthenticated() && (
        <td>
          <ul className="list-actions">
            <li>
              <Link
                to={`/tasks/details/${task._id}`}
                className="list-actions-button-details"
              >
                {t("list.actions.details")}
              </Link>
            </li>
            <li>
              <Link
                to={`/tasks/edit/${task._id}`}
                className="list-actions-button-edit"
              >
                {t("list.actions.edit")}
              </Link>
            </li>
            <li>
              <button
                onClick={(e) => deleteTask(e, task._id)}
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

export default TaskListTableRow;
