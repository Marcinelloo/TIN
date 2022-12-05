function resetErrors(inputs, errorTexts, errorInfo) {
  inputs.forEach((input) => {
    input.classList.remove("error-input");
  });

  errorTexts.forEach((errors) => {
    errors.innerText = "";
  });

  errorInfo.innerText = "";
}

function checkRequired(value) {
  if (!value) {
    return false;
  }

  value = value.toString().trim();

  if (value === "") {
    return false;
  }

  return true;
}

function checkTextRange(value, min, max) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const lenght = value.lenght;

  if (max && lenght > max) {
    return false;
  }

  if (min && lenght < min) {
    return false;
  }

  return true;
}

function checkEmail(value) {
  if (!value) {
    return false;
  }

  value = value.toString().trim();
  const re =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(value);
}

function getFormatedDate(inputDate) {
  const date = new Date(inputDate);
  let day = date.getDay() + 1 + "";
  let month = date.getMonth() + "";
  let year = date.getFullYear();

  month = month.length < 2 ? "0" + month : month;
  day = day.length < 2 ? "0" + day : day;

  const todayFormated = [year, month, day].join("-");
}

function checkDate(value) {
  if (!value) {
    return false;
  }
  const pattern = /(\d{4})-(\d{2})-(\d{2})/;
  return pattern.test(value);
}

function checkDateIfAfter(value, compare) {
  if (!value || !compare) {
    return false;
  }

  if (!checkDate(value) || !checkDate(compare)) {
    return false;
  }

  const valueDate = new Date(value);
  const compareToDate = new Date(compare);

  if (valueDate.getTime() < compareToDate.getTime()) {
    return false;
  }

  return true;
}

function checkNumberRange(value, min, max) {
  if (!value) {
    return false;
  }

  if (isNaN(value)) {
    return false;
  }

  value = parseFloat(value);

  if (value < min || value > max) {
    return;
  }

  return true;
}

function validationForm() {
  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const activeInput = document.getElementById("active");

  const errorName = document.getElementById("errorName");
  const errorSurname = document.getElementById("errorSurname");
  const errorEmail = document.getElementById("errorEmail");
  const errorPassword = document.getElementById("errorPassword");
  const errorActive = document.getElementById("errorActive");
  const errorSumary = document.getElementById("errorSumary");

  resetErrors(
    [nameInput, surnameInput, emailInput, passwordInput, activeInput],
    [errorName, errorSurname, errorEmail, errorPassword, errorActive],
    errorSumary
  );

  let valid = true;

  if (!checkRequired(nameInput.value)) {
    valid = false;
    nameInput.classList.add("error-input");
    errorName.innerText = "Pole jest wymagane";
  } else if (!checkTextRange(nameInput.value, 5, 20)) {
    valid = false;
    nameInput.classList.add("error-input");
    errorName.innerText = "Pole powinno zawierac od 5 do 20 znakow";
  }

  const today = new Date().toString();

  if (!checkRequired(surnameInput.value)) {
    valid = false;
    surnameInput.classList.add("error-input");
    errorSurname.innerText = "Pole jest wymagane";
  } else if (!checkTextRange(surnameInput.value, 5, 20)) {
    valid = false;
    surnameInput.classList.add("error-input");
    errorSurname.innerText = "Pole powinno zawierac od 5 do 20 znakow";
  }

  if (!checkRequired(emailInput.value)) {
    valid = false;
    emailInput.classList.add("error-input");
    errorEmail.innerText = "Pole jest wymagane";
  } else if (!checkTextRange(emailInput.value, 5, 40)) {
    valid = false;
    emailInput.classList.add("error-input");
    errorEmail.innerText = "Pole powinno zawierac od 5 do 40 znakow";
  } else if (!checkEmail(emailInput.value)) {
    valid = false;
    emailInput.classList.add("error-input");
    errorEmail.innerText = "Pole powinno zawierac poprawny address email";
  }

  if (!checkRequired(passwordInput.value)) {
    valid = false;
    passwordInput.classList.add("error-input");
    errorPassword.innerText = "Pole jest wymagane";
  } else if (!checkTextRange(passwordInput.value, 5, 40)) {
    valid = false;
    passwordInput.classList.add("error-input");
    errorPassword.innerText = "Pole powinno zawierac od 5 do 40 znakow";
  }

  if (!valid) {
    errorSumary.innerText = "Formularz zaiwiera blędy";
  }
}
