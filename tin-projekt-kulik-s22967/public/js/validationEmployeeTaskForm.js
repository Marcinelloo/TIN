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
  const employeeInput = document.getElementById("employee");
  const taskInput = document.getElementById("task");
  const statusInput = document.getElementById("status");
  const commentInput = document.getElementById("comment");

  const errorEmployee = document.getElementById("errorEmployee");
  const errorTask = document.getElementById("errorTask");
  const errorStatus = document.getElementById("errorStatus");
  const errorComment = document.getElementById("errorComment");
  const errorSumary = document.getElementById("errorSumary");

  resetErrors(
    [employeeInput, taskInput, statusInput, commentInput],
    [errorEmployee, errorTask, errorStatus, errorComment],
    errorSumary
  );

  let valid = true;

  if (!checkRequired(employeeInput.value)) {
    valid = false;
    employeeInput.classList.add("error-input");
    errorEmployee.innerText = "Pole jest wymagane";
  }

  if (!checkRequired(taskInput.value)) {
    valid = false;
    taskInput.classList.add("error-input");
    taskInput.innerText = "Pole jest wymagane";
  }

  if (!checkRequired(statusInput.value)) {
    valid = false;
    statusInput.classList.add("error-input");
    errorStatus.innerText = "Pole jest wymagane";
  }

  // if (!checkRequired(commentInput.value)) {
  //   valid = false;
  //   commentInput.classList.add("error-input");
  //   errorComment.innerText = "Pole jest wymagane";
  // } else if (!checkTextRange(commentInput.value, 10, 200)) {
  //   valid = false;
  //   commentInput.classList.add("error-input");
  //   errorComment.innerText = "Pole powinno zawierac od 2 do 200 znakow";
  // }

  if (!valid) {
    errorSumary.innerText = "Formularz zaiwiera blędy";
  }
}
