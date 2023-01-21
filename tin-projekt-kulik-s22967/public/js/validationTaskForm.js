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
  return new Date(inputDate).toISOString().split('T')[0]
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
  const titleInput = document.getElementById("title");
  const dueToInput = document.getElementById("dueTo");
  const createdAtInput = document.getElementById("createdAt");
  const descriptionInput = document.getElementById("description");

  const errorTitle = document.getElementById("errorTitle");
  const errorDueTo = document.getElementById("errorDueTo");
  const errorCreatedAt = document.getElementById("errorCreatedAt");
  const errordescription = document.getElementById("errordescription");
  const errorSumary = document.getElementById("errorSumary");

  resetErrors(
    [titleInput, dueToInput, createdAtInput, descriptionInput],
    [errorTitle, errorDueTo, errorCreatedAt, errordescription],
    errorSumary
  );

  let valid = true;

  if (!checkRequired(titleInput.value)) {
    valid = false;
    titleInput.classList.add("error-input");
    errorTitle.innerText = "Pole jest wymagane";
  } else if (!checkTextRange(titleInput.value, 5, 20)) {
    valid = false;
    titleInput.classList.add("error-input");
    errorTitle.innerText = "Pole powinno zawierac od 2 do 60 znakow";
  }

  const today = new Date().toString();

  if (!checkRequired(dueToInput.value)) {
    valid = false;
    dueToInput.classList.add("error-input");
    errorDueTo.innerText = "Pole jest wymagane";
  } else if (!checkDate(dueToInput.value)) {
    valid = false;
    dueToInput.classList.add("error-input");
    errorDueTo.innerText =
      "Pole powinno zawierac date w formacie yyy-MM-dd (np. 2000-01-01)";
  } else if (!checkDateIfAfter(dueToInput.value, getFormatedDate(today))) {
    valid = false;
    dueToInput.classList.add("error-input");
    errorDueTo.innerText = "Data nie moze byc z przeszlosci";
  } else if (
    checkRequired(dueToInput.value) &&
    checkDate(dueToInput.value) &&
    !checkDateIfAfter(dueToInput.value, getFormatedDate(createdAtInput.value))
  ) {
    valid = false;
    dueToInput.classList.add("error-input");
    errorDueTo.innerText = "Data nie moze byc wczesniejsza niz data stworzenia";
  }

  if (!checkRequired(createdAtInput.value)) {
    valid = false;
    createdAtInput.classList.add("error-input");
    errorCreatedAt.innerText = "Pole jest wymagane";
  } else if (!checkDate(createdAtInput)) {
    valid = false;
    createdAtInput.classList.add("error-input");
    errorCreatedAt.innerText =
      "Pole powinno zawierac date w formacie yyy-MM-dd (np. 2000-01-01)";
  }

  if (!checkRequired(descriptionInput.value)) {
    valid = false;
    descriptionInput.classList.add("error-input");
    descriptionInput.innerText = "Pole jest wymagane";
  } else if (!checkTextRange(descriptionInput.value, 10, 200)) {
    valid = false;
    descriptionInput.classList.add("error-input");
    errordescription.innerText = "Pole powinno zawierac od 2 do 60 znakow";
  }

  if (!valid) {
    errorSumary.innerText = "Formularz zaiwiera blędy";
  }
}
