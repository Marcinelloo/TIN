import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getEmployeeTaskByFilter } from "../../api/repositories/employeeTask";
import FormInput from "../../common/components/FormInput";
import { getFormattedDate } from "../../common/functions/getFormattedDate";
import EmployeeTaskListTable from "../employee-task-list/EmployeeTaskListTable";

const CurrentTasks = () => {
  const [filter, setFilter] = useState({
    from: getFormattedDate(moment(), "YYYY-MM-DD"),
    to: getFormattedDate(moment(), "YYYY-MM-DD"),
    status: "created",
  });

  const [errors, setErrors] = useState({
    from: "",
    to: "",
    status: "",
  });

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState([]);

  const { t } = useTranslation();

  function fetchCurrentEmployeeTaskList(e) {
    e.preventDefault();

    getEmployeeTaskByFilter(filter)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setResult(data);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function handleChange(event) {
    let { type, name, value, checked } = event.target;

    if (type === "checkbox") {
      value = checked;
    }
    setFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  let content;

  if (error) {
    content = <p>Błąd: {error.message}</p>;
  } else if (!isLoaded) {
    // content = <p>Ładowanie danych pracowników...</p>;
  } else {
    content =
      result.length > 0 ? (
        <EmployeeTaskListTable employeeTasks={result} noAction={true} />
      ) : (
        "There is no data"
      );
  }

  return (
    <>
      <form
        className="form"
        style={{
          maxWidth: "400px",
          display: "flex",
          flexWrap: "wrap",
          alginItems: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
        onSubmit={(e) => fetchCurrentEmployeeTaskList(e)}
      >
        <FormInput
          name={"from"}
          label={"Created at From"}
          required={true}
          value={filter.from}
          type="date"
          onChange={handleChange}
          error={errors["from"]}
        />
        <FormInput
          name={"to"}
          label={"Created at To"}
          required={true}
          value={filter.to}
          type="date"
          onChange={handleChange}
          error={errors["to"]}
        />
        <FormInput
          name={"status"}
          label={"Status"}
          required={true}
          value={filter.status}
          type="text"
          onChange={handleChange}
          error={errors["status"]}
        />
        <button type="submit" className="form-button-submit">
          Search
        </button>
      </form>
      {content}
    </>
  );
};

export default CurrentTasks;
