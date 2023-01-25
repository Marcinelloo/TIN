import axios from "axios";

const EmployeeTaskBaseUrl = "http://localhost:3000/api/employees-tasks";

export function getEmployeeTaskById(empId) {
  const url = `${EmployeeTaskBaseUrl}/${empId}`;
  const promise = fetch(url);
  return promise;
}

export function getEmployeeTask() {
  const promise = fetch(EmployeeTaskBaseUrl);
  return promise;
}

export function addEmployeeTask(emp) {
  const empString = JSON.stringify(emp);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: empString,
  };
  const promise = fetch(EmployeeTaskBaseUrl, options);
  return promise;
}

export function updateEmployeeTask(empId, emp) {
  const url = `${EmployeeTaskBaseUrl}/${empId}`;
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

export function deleteEmployeeTaskApiCall(empId) {
  const url = `${EmployeeTaskBaseUrl}/${empId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const promise = fetch(url, options);
  return promise;
}
