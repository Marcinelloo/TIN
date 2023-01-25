import axios from "axios";

const employeesBaseUrl = "http://localhost:3000/api/employees";

export function getEmployeeById(empId) {
  const url = `${employeesBaseUrl}/${empId}`;
  const promise = fetch(url);
  return promise;
}

export function getEmployees() {
  const promise = fetch(employeesBaseUrl);
  return promise;
}

export function addEmployee(emp) {
  const empString = JSON.stringify(emp);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: empString,
  };
  const promise = fetch(employeesBaseUrl, options);
  return promise;
}

export function updateEmployee(empId, emp) {
  const url = `${employeesBaseUrl}/${empId}`;
  const empString = JSON.stringify(emp);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: empString,
  };
  const promise = fetch(url, options);
  return promise;
}

export function deleteEmployeeApiCall(empId) {
  const url = `${employeesBaseUrl}/${empId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const promise = fetch(url, options);
  return promise;
}
