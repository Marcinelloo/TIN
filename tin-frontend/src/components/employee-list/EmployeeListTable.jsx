import React from "react";
import EmployeeListTableRow from "./EmployeeListTableRow";

function EmployeeListTable(props) {
  const employees = props.empList;
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>E-mail</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <EmployeeListTableRow
            empData={emp}
            key={emp._id}
            deleteEmployee={props.deleteEmployee}
          />
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeListTable;
