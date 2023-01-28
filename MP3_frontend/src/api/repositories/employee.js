import axios from "axios";
import { getToken } from "../../common/functions/getToketn";

const employeesBaseUrl = "http://localhost:3000/api/employees";

const baseAuthUrl = "http://localhost:3000/api/auth";

export function loginApiCall(user) {
  const url = `${baseAuthUrl}/login`;
  const userString = JSON.stringify(user);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userString,
  };
  const promise = fetch(url, options);
  return promise;
}

export function getEmployeeById(empId) {
  const token = getToken();
  const url = `${employeesBaseUrl}/${empId}`;
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

export function getEmployees() {
  const promise = fetch(employeesBaseUrl);
  return promise;
}

export function addEmployee(emp) {
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
  const promise = fetch(employeesBaseUrl, options);
  return promise;
}

export function updateEmployee(empId, emp) {
  const token = getToken();
  const url = `${employeesBaseUrl}/${empId}`;
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

export function deleteEmployeeApiCall(empId) {
  const token = getToken();
  const url = `${employeesBaseUrl}/${empId}`;
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
