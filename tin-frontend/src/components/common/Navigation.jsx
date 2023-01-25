import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="">
            Strona główna
          </Link>
        </li>
        <li>
          <Link to="/employees">Pracownicy</Link>
        </li>
        <li>
          <Link to="/employees-tasks">Zadania Pracownikow</Link>
        </li>
        <li>
          <Link to="/tasks">Zadania</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
