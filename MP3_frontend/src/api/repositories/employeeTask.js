import axios from "axios";
import { getToken } from "../../common/functions/getToketn";

const EmployeeTaskBaseUrl = "http://localhost:3000/api/employees-tasks";

export function getEmployeeTaskById(empId) {
  const token = getToken();
  const url = `${EmployeeTaskBaseUrl}/${empId}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const promise = fetch(url, options);
  return promise;
}

export function getEmployeeTask() {
  const promise = fetch(EmployeeTaskBaseUrl);
  return promise;
}

export function addEmployeeTask(emp) {
  const token = getToken();
  const empString = JSON.stringify(emp);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: empString,
  };
  const promise = fetch(EmployeeTaskBaseUrl, options);
  return promise;
}

export function updateEmployeeTask(empId, emp) {
  const token = getToken();
  const url = `${EmployeeTaskBaseUrl}/${empId}`;
  const empString = JSON.stringify(emp);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: empString,
  };
  const promise = fetch(url, options);
  return promise;
}

export function deleteEmployeeTaskApiCall(empId) {
  const token = getToken();
  const url = `${EmployeeTaskBaseUrl}/${empId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const promise = fetch(url, options);
  return promise;
}

export function getEmployeeTaskByFilter(filter) {
  const token = getToken();
  const url = `${EmployeeTaskBaseUrl}/filter/${filter.status}/${filter.from}/${filter.to}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const promise = fetch(url, options);
  return promise;
}
