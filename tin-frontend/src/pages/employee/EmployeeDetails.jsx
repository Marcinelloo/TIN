import React, { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEmployeeById } from "../../api/repositories/employee";
import EmployeeDetailsData from "../../components/employee-details/EmployeeDetailsData";

function EmployeeDetails() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [employee, setEmployee] = useState([]);

  let { id } = useParams();
  id = parseInt(id);

  function fetchEmployeeDetails() {
    getEmployeeById(id)
      .then((res) => {
        return res.json();
      })
      .then(
        (data) => {
          if (data.message) {
            setEmployee(null);
            setError(data.message);
          } else {
            setEmployee(data);
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
    {
      console.log(error);
    }
    content = <p>Error: {error.message}</p>;
  } else if (!isLoaded) {
    content = <p>Loading employee data...</p>;
  } else {
    content = <EmployeeDetailsData employee={employee} />;
  }

  useLayoutEffect(() => {
    fetchEmployeeDetails();
  }, []);

  return (
    <main>
      <h2>Informacje o pracowniku</h2>
      {content}
      <div className="section-buttons">
        <Link to="/employees" className="list-actions-button-details ">
          Back
        </Link>
      </div>
    </main>
  );
}
export default EmployeeDetails;
