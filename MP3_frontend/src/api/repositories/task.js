import axios from "axios";
import { getToken } from "../../common/functions/getToketn";

const TasksBaseUrl = "http://localhost:3000/api/tasks";

export function getTaskById(empId) {
  const token = getToken();
  const url = `${TasksBaseUrl}/${empId}`;
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

export function getTasks() {
  const promise = fetch(TasksBaseUrl);
  return promise;
}

export function addTask(emp) {
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
  const promise = fetch(TasksBaseUrl, options);
  return promise;
}

export function updateTask(empId, emp) {
  const token = getToken();
  const url = `${TasksBaseUrl}/${empId}`;
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

export function deleteTaskApiCall(empId) {
  const token = getToken();
  const url = `${TasksBaseUrl}/${empId}`;
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
