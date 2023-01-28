import React, { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTaskById } from "../../api/repositories/task";
import TaskDetailsData from "../../components/task-details/TaskDetailsData";

function TaskDetails() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [task, setTask] = useState([]);

  let { id } = useParams();
  id = parseInt(id);

  function fetchTaskDetails() {
    getTaskById(id)
      .then((res) => {
        return res.json();
      })
      .then(
        (data) => {
          if (data.message) {
            setTask(null);
            setError(data.message);
          } else {
            setTask(data);
            setError(null);
          }
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  let content;

  if (error) {
    content = <p>Error: {error.message}</p>;
  } else if (!isLoaded) {
    content = <p>Loading task data...</p>;
  } else {
    content = <TaskDetailsData task={task} />;
  }

  useLayoutEffect(() => {
    fetchTaskDetails();
  }, []);

  return (
    <main>
      <h2>Informacje o zadaniu</h2>
      {content}
      <div className="section-buttons">
        <Link to="/tasks" className="list-actions-button-details ">
          Back
        </Link>
      </div>
    </main>
  );
}
export default TaskDetails;
