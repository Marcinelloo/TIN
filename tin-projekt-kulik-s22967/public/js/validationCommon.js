export function resetErrors(inputs, errorTexts, errorInfo) {
  inputs.forEach((input) => {
    input.classList.remove("error-input");
  });

  errorTexts.forEach((errors) => {
    errors.innerText = "";
  });

  errorInfo.innerText = "";
}

export function checkRequired(value) {
  if (!value) {
    return false;
  }

  value = value.toString().trim();

  if (value === "") {
    return false;
  }

  return true;
}

export function checkTextRange(value, min, max) {
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

export function checkEmail(value) {
  if (!value) {
    return false;
  }

  value = value.toString().trim();
  const re =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(value);
}

export function getFormatedDate(inputDate) {
  const date = new Date(inputDate);
  let day = date.getDay() + 1 + "";
  let month = date.getMonth() + "";
  let year = date.getFullYear();

  month = month.length < 2 ? "0" + month : month;
  day = day.length < 2 ? "0" + day : day;

  const todayFormated = [year, month, day].join("-");
}

export function checkDate(value) {
  if (!value) {
    return false;
  }
  const pattern = /(\d{4})-(\d{2})-(\d{2})/;
  return pattern.test(value);
}

export function checkDateIfAfter(value, compare) {
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

export function checkNumberRange(value, min, max) {
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
