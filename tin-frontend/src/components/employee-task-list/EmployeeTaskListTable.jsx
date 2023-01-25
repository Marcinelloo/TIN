import React from "react";
import EmployeeTaskListTableRow from "./EmployeeTaskListTableRow";

function EmployeeTaskListTable({ employeeTasks, deleteEmployeeTask }) {
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>Imie</th>
          <th>Nazwisko</th>
          <th>Nazwa zadania</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {employeeTasks.map((employeeTask) => (
          <EmployeeTaskListTableRow
            employeeTask={employeeTask}
            key={employeeTask._id}
            deleteEmployeeTask={deleteEmployeeTask}
          />
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTaskListTable;
