import React from "react";
import { useTranslation } from "react-i18next";
import EmployeeListTableRow from "./EmployeeListTableRow";

function EmployeeListTable(props) {
  const { t } = useTranslation();

  const employees = props.empList;
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th> {t("list.table-fields.employees.field_1")}</th>
          <th> {t("list.table-fields.employees.field_2")}</th>
          <th> {t("list.table-fields.employees.field_3")}</th>
          <th> {t("list.actions.title")}</th>
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
