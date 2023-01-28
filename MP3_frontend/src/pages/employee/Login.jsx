import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { loginApiCall } from "../../api/repositories/employee";
import FormButtons from "../../common/components/FormButtons";
import FormInput from "../../common/components/FormInput";
import { checkRequired } from "../../common/functions/validation";

function LoginForm(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [message, setMessage] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      let response;
      loginApiCall(user)
        .then((res) => {
          response = res;
          return res.json();
        })
        .then(
          (data) => {
            if (response.status === 200) {
              if (data.token) {
                const userString = JSON.stringify(data);
                props.handleLogin(userString);
                navigate(-1);
              }
            } else if (response.status === 401) {
              setMessage(() => data.message);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }

  function validateField(fieldName, fieldValue) {
    let errorMessage = "";
    if (fieldName === "email") {
      if (!checkRequired(fieldValue)) {
        errorMessage = t("aaa");
      }
    }
    if (fieldName === "password") {
      if (!checkRequired(fieldValue)) {
        errorMessage = t("aaa");
      }
    }
    return errorMessage;
  }

  function validateForm() {
    let isValid = true;
    let serverFieldsErrors = { ...errors };
    Object.entries(user).forEach(([key, value]) => {
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
    let hasErrors = false;
    Object.values(errors).forEach((value) => {
      if (value.length > 0) {
        hasErrors = true;
      }
    });
    return hasErrors;
  }

  const errorsSummary = hasErrors()
    ? t("form.validation.messages.formErrors")
    : "";
  const fetchError = error ? `${t("error")}: ${error.message}` : "";
  const globalErrorMessage = message || errorsSummary || fetchError;

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div id="login">
        <h2>{t("auth.title")}</h2>
        <form className="form" method="post" onSubmit={handleSubmit}>
          <FormInput
            name="email"
            value={user.email}
            error={errors.email}
            label={t("details.employees.field_3")}
            onChange={handleChange}
            type="text"
          />
          <FormInput
            name="password"
            value={user.password}
            error={errors.password}
            label={t("details.employees.field_5")}
            onChange={handleChange}
            type="password"
          />
          <FormButtons
            cancelPath="/"
            error={globalErrorMessage}
            submitButtonLabel={t("details.actions.field_5")}
          />
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
