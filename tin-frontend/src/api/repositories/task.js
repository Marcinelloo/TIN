import axios from "axios";

const TasksBaseUrl = "http://localhost:3000/api/tasks";

export function getTaskById(empId) {
  const url = `${TasksBaseUrl}/${empId}`;
  const promise = fetch(url);
  return promise;
}

export function getTasks() {
  const promise = fetch(TasksBaseUrl);
  return promise;
}

export function addTask(emp) {
  const empString = JSON.stringify(emp);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: empString,
  };
  const promise = fetch(TasksBaseUrl, options);
  return promise;
}

export function updateTask(empId, emp) {
  const url = `${TasksBaseUrl}/${empId}`;
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

export function deleteTaskApiCall(empId) {
  const url = `${TasksBaseUrl}/${empId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const promise = fetch(url, options);
  return promise;
}
