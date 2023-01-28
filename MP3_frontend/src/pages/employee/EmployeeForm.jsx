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

const EmployeeForm = () => {
  const [emp, setEmp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    active: false,
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    active: false,
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [message, setMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  const currentFormMode = id ? FormMode.EDIT : FormMode.NEW;

  const navigate = useNavigate();

  function fetchEmployeeDetails() {
    getEmployeeById(id)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message);
          } else {
            setEmp(data);
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
    setEmp((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function validateField(fieldName, fieldValue, checked) {
    let errorMessage = "";
    if (fieldName === "firstName") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Pole jest wymagane.";
      } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
        errorMessage = "Pole powinno zawierać od 5 do 60 znaków.";
      }
    }
    if (fieldName === "lastName") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Pole jest wymagane";
      } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
        errorMessage = "Pole powinno zawierać od 5 do 60 znaków";
      }
    }
    if (fieldName === "email") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Pole jest wymagane";
      } else if (!checkTextLengthRange(fieldValue, 10, 60)) {
        errorMessage = "Pole powinno zawierać od 10 do 60 znaków";
      } else if (!checkEmail(fieldValue)) {
        errorMessage = "Pole powinno zawierać prawidłowy adres email";
      }
    }
    if (fieldName === "password") {
      if (!checkRequired(fieldValue)) {
        errorMessage = "Pole jest wymagane";
      } else if (!checkTextLengthRange(fieldValue, 6, 60)) {
        errorMessage = "Pole powinno zawierać od 6 do 60 znaków";
      }
    }
    // if (fieldName === "active") {
    //   fieldValue = checked ? "true" : "";
    //   if (!checkRequired(fieldValue)) {
    //     errorMessage = "Pole jest wymagane";
    //   }
    // }
    return errorMessage;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      let promise, response;
      if (currentFormMode === FormMode.NEW) {
        promise = addEmployee(emp);
      } else if (currentFormMode === FormMode.EDIT) {
        promise = updateEmployee(id, emp);
      }
      if (promise) {
        promise
          .then((data) => {
            response = data;
            console.log(data);
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
    Object.entries(emp).forEach(([key, value]) => {
      const errorMessage = validateField(key, value);
      serverFieldsErrors[key] = errorMessage;
      if (errorMessage.length > 0) {
        isValid = false;
      }
    });
    console.log(serverFieldsErrors);
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
      fetchEmployeeDetails();
    }
  }, []);

  useEffect(() => {
    if (redirect) {
      navigate("/employees");
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
        <FormInput
          name={"firstName"}
          label={"Imie"}
          required={true}
          value={emp.firstName}
          type="text"
          placeholder="5-60 znaków"
          error={errors["firstName"]}
          onChange={handleChange}
        />
        <FormInput
          name={"lastName"}
          label={"Nazwisko"}
          required={true}
          value={emp.lastName}
          type="text"
          placeholder="5-60 znaków"
          onChange={handleChange}
          error={errors["lastName"]}
        />
        <FormInput
          name={"email"}
          label={"Email"}
          required={true}
          value={emp.email}
          type="email"
          onChange={handleChange}
          placeholder="np. nazwa@domena.pl"
          error={errors["email"]}
        />
        <FormInput
          name={"password"}
          label={"Password"}
          required={true}
          value={emp.password}
          type="password"
          onChange={handleChange}
          placeholder="10-60 znaków"
          error={errors["password"]}
        />
        <FormInput
          name={"active"}
          label={"Aktywny"}
          required={true}
          value={emp.active}
          type="checkbox"
          onChange={handleChange}
          error={errors["active"]}
        />
        <FormButtons formMode={currentFormMode} cancelPath={"/employees"} />
      </form>
    </main>
  );
};

export default EmployeeForm;
