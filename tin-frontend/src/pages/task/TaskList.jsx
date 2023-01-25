import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { deleteTaskApiCall, getTasks } from "../../api/repositories/task";
import TaskListTable from "../../components/task-list/TaskListTable";

const TaskList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, SetTasks] = useState([]);

  function fetchTaskList() {
    getTasks()
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(
        (data) => {
          setIsLoaded(true);
          SetTasks(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function deleteTask(e, id) {
    e.preventDefault();
    deleteTaskApiCall(id)
      .then((res) => res.json())
      .then(
        (data) => {
          fetchTaskList();
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  let content;

  if (error) {
    content = <p>Błąd: {error.message}</p>;
  } else if (!isLoaded) {
    content = <p>Ładowanie danych zadan...</p>;
  } else {
    content = <TaskListTable tasks={tasks} deleteTask={deleteTask} />;
  }

  useLayoutEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <main>
      <h2>Lista zadań</h2>
      {content}
      <p className="section-buttons">
        <Link to="/tasks/add" className="button-add">
          Dodaj nowe zadanie
        </Link>
      </p>
    </main>
  );
};

export default TaskList;
