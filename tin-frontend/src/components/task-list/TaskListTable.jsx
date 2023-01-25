import React from "react";
import TaskListTableRow from "./TaskListTableRow";
import EmployeeListTableRow from "./TaskListTableRow";

function TaskListTable({ tasks, deleteTask }) {
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>Tytuł</th>
          <th>Data sworzenia</th>
          <th>Data zakończenia</th>
          <th>Opis</th>
          <th>Akcje</th>
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
