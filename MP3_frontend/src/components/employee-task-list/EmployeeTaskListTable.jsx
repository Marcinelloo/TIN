import React from "react";
import { useTranslation } from "react-i18next";
import EmployeeTaskListTableRow from "./EmployeeTaskListTableRow";

function EmployeeTaskListTable({
  employeeTasks,
  deleteEmployeeTask,
  noAction = false,
}) {
  const { t } = useTranslation();

  return (
    <table className="table-list">
      <thead>
        <tr>
          <th> {t("list.table-fields.employeeTasks.field_1")}</th>
          <th> {t("list.table-fields.employeeTasks.field_2")}</th>
          <th> {t("list.table-fields.employeeTasks.field_3")}</th>
          <th> {t("list.actions.title")}</th>
        </tr>
      </thead>
      <tbody>
        {employeeTasks.map((employeeTask) => (
          <EmployeeTaskListTableRow
            employeeTask={employeeTask}
            key={employeeTask._id}
            deleteEmployeeTask={deleteEmployeeTask}
            noAction={noAction}
          />
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTaskListTable;
