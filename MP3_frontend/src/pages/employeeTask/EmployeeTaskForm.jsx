import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "../../api/repositories/employee";
import FormMode from "../../common/constants/form";
import {
  checkRequired,
  checkTextLengthRange,
  checkEmail,
} from "../../common/functions/validation";
import FormInput from "../../common/components/FormInput";
import FormButtons from "../../common/components/FormButtons";
import {
  addEmployeeTask,
  getEmployeeTaskById,
  updateEmployeeTask,
} from "../../api/repositories/employeeTask";
import { getTasks } from "../../api/repositories/task";
import { useLayoutEffect } from "react";
import FormSelect from "../../common/components/FormSelect";
import { mapToOptionsDisplay } from "../../common/functions/mapToOptionsDisplay";

const EmployeeTaskForm = () => {
  const [employeeTask, setEmployeeTask] = useState({
    emp_id: "",
    tsk_id: "",
    status: "",
    comment: "",
  });
  const [allEmployee, setAllEmployee] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const [errors, setErrors] = useState({
    emp_id: "",
    tsk_id: "",
    status: "",
    comment: "",
  });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [message, setMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  const currentFormMode = id ? FormMode.EDIT : FormMode.NEW;

  const navigate = useNavigate();

  function fetchEmployeeTaskDetails() {
    getEmployeeTaskById(id)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message);
          } else {
            setEmployeeTask(() => data);
            setMessage(null);
          }
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function fetchAllEmployee() {
    getEmployees()
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message);
          } else {
            setAllEmployee(() => mapToOptionsDisplay(data, "email"));
            setMessage(null);
          }
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function fetchAllTasks() {
    getTasks()
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message);
          } else {
            setAllTasks(() => mapToOptionsDisplay(data, "title"));
            setMessage(null);
          }
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function handleChange(event) {
    let { type, name, value, checked } = event.target;
    const errorMessage = validateField(name, value, checked);

    if (type === "checkbox") {
      value = checked;
    }

    setErrors((prev) => {
      return {
        ...prev,
        [name]: errorMessage,
      };
    });
    setEmployeeTask((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function validateField(fieldName, fieldValue, checked) {
    let errorMessage = "";

    if (fieldName === "status") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Pole jest wymagane.";
      }
      if (!checkTextLengthRange(fieldValue, 8, 60)) {
        errorMessage = "Pole jest powinno zawierac od 10 do 60 znakow.";
      }
    }

    return errorMessage;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validateForm();

    employeeTask["emp_id"] = parseInt(employeeTask["emp_id"]);
    employeeTask["tsk_id"] = parseInt(employeeTask["tsk_id"]);

    if (isValid) {
      let promise, response;
      if (currentFormMode === FormMode.NEW) {
        promise = addEmployeeTask(employeeTask);
      } else if (currentFormMode === FormMode.EDIT) {
        promise = updateEmployeeTask(id, employeeTask);
      }
      if (promise) {
        promise
          .then((data) => {
            response = data;
            if (response.status === 201 || response.status === 500) {
              return data.json();
            }
          })
          .then(
            (data) => {
              if (!response.ok && response.status === 500) {
                const serverFieldsErrors = { ...errors };
                for (const i in data) {
                  const errorItem = data[i];
                  const errorMessage = errorItem.message;
                  const fieldName = errorItem.path;
                  serverFieldsErrors[fieldName] = errorMessage;
                }
                setErrors(serverFieldsErrors);
                setError(null);
              } else {
                setRedirect(true);
              }
            },
            (error) => {
              setError(error);
            }
          );
      }
    }
  }

  function validateForm() {
    let isValid = true;
    let serverFieldsErrors = { ...errors };
    Object.entries(employeeTask).forEach(([key, value]) => {
      const errorMessage = validateField(key, value);
      serverFieldsErrors[key] = errorMessage;
      if (errorMessage.length > 0) {
        isValid = false;
      }
    });
    setErrors(serverFieldsErrors);
    return isValid;
  }

  function hasErrors() {
    Object.values(errors).forEach((value) => {
      if (value.length > 0) {
        return true;
      }
    });
    return false;
  }

  useEffect(() => {
    if (currentFormMode === FormMode.EDIT) {
      fetchEmployeeTaskDetails();
    }
  }, []);

  useEffect(() => {
    if (redirect) {
      navigate("/employees-tasks");
    }
  }, [redirect]);

  useLayoutEffect(() => {
    fetchAllTasks();
    fetchAllEmployee();
  }, []);

  const errorsSummary = hasErrors() ? "Formularz zawiera błędy." : "";
  const fetchError = error ? `Błąd: ${error.message}` : "";
  const globalErrorMessage = errorsSummary || fetchError || message;

  const pageTitle =
    currentFormMode === FormMode.NEW ? "Nowy pracownik" : "Edycja pracownik";

  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <FormSelect
          name={"emp_id"}
          label={"Emp"}
          required={true}
          value={employeeTask.emp_id}
          error={errors["emp_id"]}
          onChange={handleChange}
          options={allEmployee}
        />
        <FormSelect
          name={"tsk_id"}
          label={"Task"}
          required={true}
          value={employeeTask.tsk_id}
          onChange={handleChange}
          error={errors["tsk_id"]}
          options={allTasks}
        />
        <FormInput
          name={"status"}
          label={"status"}
          required={true}
          value={employeeTask.status}
          type="text"
          onChange={handleChange}
          placeholder="5-60 znaków"
          error={errors["status"]}
        />
        <FormInput
          name={"comment"}
          label={"comment"}
          required={true}
          value={employeeTask.comment}
          type="text"
          onChange={handleChange}
          placeholder="10-60 znaków"
          error={errors["comment"]}
        />
        <FormButtons
          formMode={currentFormMode}
          cancelPath={"/employees-tasks"}
        />
      </form>
    </main>
  );
};

export default EmployeeTaskForm;
