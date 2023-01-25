import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addEmployee,
  getEmployeeById,
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

const EmployeeTaskForm = () => {
  const [employeeTask, setEmployeeTask] = useState({
    employee: "",
    task: "",
    status: "",
    comment: "",
  });
  const [errors, setErrors] = useState({
    employee: "",
    task: "",
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
            setEmployeeTask(data);
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
    if (fieldName === "employee") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Pole jest wymagane.";
      }
    }
    if (fieldName === "task") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Pole jest wymagane.";
      }
    }
    if (fieldName === "status") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Pole jest wymagane";
      } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
        errorMessage = "Pole powinno zawierać od 5 do 60 znaków";
      }
    }
    return errorMessage;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validateForm();

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

  const errorsSummary = hasErrors() ? "Formularz zawiera błędy." : "";
  const fetchError = error ? `Błąd: ${error.message}` : "";
  const globalErrorMessage = errorsSummary || fetchError || message;

  const pageTitle =
    currentFormMode === FormMode.NEW ? "Nowy pracownik" : "Edycja pracownik";

  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        {/* <FormInput
          name={"firstName"}
          label={"Imie"}
          required={true}
          value={emp.firstName}
          type="text"
          placeholder="5-60 znaków"
          error={errors["firstName"]}
          onChange={handleChange}
        /> */}
        {/* <FormInput
          name={"lastName"}
          label={"Nazwisko"}
          required={true}
          value={emp.lastName}
          type="text"
          placeholder="5-60 znaków"
          onChange={handleChange}
          error={errors["lastName"]}
        /> */}
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
        <FormButtons formMode={currentFormMode} />
      </form>
    </main>
  );
};

export default EmployeeTaskForm;
