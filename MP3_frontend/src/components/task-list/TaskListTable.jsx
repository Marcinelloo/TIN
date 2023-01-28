import React from "react";
import { useTranslation } from "react-i18next";
import TaskListTableRow from "./TaskListTableRow";
import EmployeeListTableRow from "./TaskListTableRow";

function TaskListTable({ tasks, deleteTask }) {
  const { t } = useTranslation();

  return (
    <table className="table-list">
      <thead>
        <tr>
          <th> {t("list.table-fields.tasks.field_1")}</th>
          <th> {t("list.table-fields.tasks.field_2")}</th>
          <th> {t("list.table-fields.tasks.field_3")}</th>
          <th> {t("list.table-fields.tasks.field_4")}</th>
          <th> {t("list.actions.title")}</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskListTableRow
            task={task}
            key={task._id}
            deleteTask={deleteTask}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TaskListTable;
