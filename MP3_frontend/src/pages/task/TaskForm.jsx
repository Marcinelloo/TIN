import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormMode from "../../common/constants/form";
import {
  checkRequired,
  checkTextLengthRange,
} from "../../common/functions/validation";
import FormInput from "../../common/components/FormInput";
import FormButtons from "../../common/components/FormButtons";
import { addTask, getTaskById, updateTask } from "../../api/repositories/task";
import { getFormattedDate } from "../../common/functions/getFormattedDate";
import { useTranslation } from "react-i18next";

const TaskForm = () => {
  const { t } = useTranslation();

  const [task, setTask] = useState({
    title: "",
    dueTo: "",
    created: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    dueTo: "",
    created: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [message, setMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  const currentFormMode = id ? FormMode.EDIT : FormMode.NEW;

  const navigate = useNavigate();

  function fetchTaskDetails() {
    getTaskById(id)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            setMessage(data.message);
          } else {
            setTask(data);
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
    setTask((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function validateField(fieldName, fieldValue, checked) {
    let errorMessage = "";
    if (fieldName === "title") {
      if (!checkRequired(fieldValue)) {
        errorMessage = t("form.errors.error_1");
      } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
        errorMessage = t("form.errors.error_2");
      }
    }
    if (fieldName === "dueTo") {
      if (!checkRequired(fieldValue)) {
        errorMessage = t("form.errors.error_1");
      }
    }
    if (fieldName === "created") {
      if (!checkRequired(fieldValue)) {
        errorMessage = t("form.errors.error_1");
      }
    }
    if (fieldName === "description") {
      if (!checkRequired(fieldValue)) {
        errorMessage = t("form.errors.error_1");
      } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
        errorMessage = t("form.errors.error_2");
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
        promise = addTask(task);
      } else if (currentFormMode === FormMode.EDIT) {
        promise = updateTask(id, task);
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
    Object.entries(task).forEach(([key, value]) => {
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
      fetchTaskDetails();
    }
  }, []);

  useEffect(() => {
    if (redirect) {
      navigate("/tasks");
    }
  }, [redirect]);

  const errorsSummary = hasErrors() ? "Formularz zawiera błędy." : "";
  const fetchError = error ? `${t("form.error_0")}: ${error.message}` : "";
  const globalErrorMessage = errorsSummary || fetchError || message;

  const pageTitle =
    currentFormMode === FormMode.NEW
      ? t("form.tasks.title_add")
      : t("form.tasks.title_edit");

  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          name={"title"}
          label={t("form.tasks.field_1")}
          required={true}
          value={task.title}
          type="text"
          placeholder="5-60 znaków"
          error={errors["title"]}
          onChange={handleChange}
        />
        <FormInput
          name={"dueTo"}
          label={t("form.tasks.field_2")}
          required={true}
          value={task.dueTo && getFormattedDate(task.dueTo)}
          type="date"
          onChange={handleChange}
          error={errors["dueTo"]}
        />
        <FormInput
          name={"created"}
          label={t("form.tasks.field_3")}
          required={true}
          value={task.created && getFormattedDate(task.created)}
          type="date"
          onChange={handleChange}
          error={errors["created"]}
        />
        <FormInput
          name={"description"}
          label={t("form.tasks.field_4")}
          required={true}
          value={task.description}
          type="text"
          onChange={handleChange}
          placeholder="5-60 znaków"
          error={errors["description"]}
        />
        <FormButtons formMode={currentFormMode} cancelPath={"/tasks"} />
      </form>
    </main>
  );
};

export default TaskForm;
