import Navigation from "./components/common/Navigation";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import MainContent from "./components/start-page/MainContent";
import EmployeeList from "./pages/employee/EmployeeList";

import { Routes, Route } from "react-router-dom";
import EmployeeDetails from "./pages/employee/EmployeeDetails";
import EmployeeForm from "./pages/employee/EmployeeForm";
import TaskList from "./pages/task/TaskList";
import TaskDetails from "./pages/task/TaskDetails";
import TaskForm from "./pages/task/TaskForm";
import EmployeeTaskList from "./pages/employeeTask/EmployeeTaskList";
import EmployeeTaskDetails from "./pages/employeeTask/EmployeeTaskDetails";
import EmployeeTaskForm from "./pages/employeeTask/EmployeeTaskForm";
import LoginForm from "./pages/employee/Login";
import ContentWrapper from "./ContentWrapper";
import { useState } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  const [user, setUser] = useState();

  const handleLogin = (user) => {
    localStorage.setItem("user", user);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={
            <ContentWrapper handleLogout={handleLogout}>
              <MainContent />
            </ContentWrapper>
          }
        />
        <Route path="employees">
          <Route
            index={true}
            element={
              <ContentWrapper handleLogout={handleLogout}>
                <EmployeeList />{" "}
              </ContentWrapper>
            }
          />
          <Route
            path="details/:id"
            element={
              <ProtectedRoute>
                <ContentWrapper handleLogout={handleLogout}>
                  <EmployeeDetails />{" "}
                </ContentWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoute>
                <ContentWrapper handleLogout={handleLogout}>
                  <EmployeeForm />{" "}
                </ContentWrapper>{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <ProtectedRoute>
                <ContentWrapper handleLogout={handleLogout}>
                  <EmployeeForm />{" "}
                </ContentWrapper>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="tasks">
          <Route
            index={true}
            element={
              <ContentWrapper handleLogout={handleLogout}>
                <TaskList />{" "}
              </ContentWrapper>
            }
          />
          <Route
            path="details/:id"
            element={
              <ProtectedRoute>
                <ContentWrapper handleLogout={handleLogout}>
                  <TaskDetails />{" "}
                </ContentWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoute>
                <ContentWrapper handleLogout={handleLogout}>
                  <TaskForm />{" "}
                </ContentWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <ProtectedRoute>
                <ContentWrapper handleLogout={handleLogout}>
                  <TaskForm />{" "}
                </ContentWrapper>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="employees-tasks">
          <Route
            index={true}
            element={
              <ContentWrapper handleLogout={handleLogout}>
                <EmployeeTaskList />{" "}
              </ContentWrapper>
            }
          />
          <Route
            path="details/:id"
            element={
              <ProtectedRoute>
                <ContentWrapper handleLogout={handleLogout}>
                  <EmployeeTaskDetails />{" "}
                </ContentWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedRoute>
                <ContentWrapper handleLogout={handleLogout}>
                  <EmployeeTaskForm />{" "}
                </ContentWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <ProtectedRoute>
                <ContentWrapper handleLogout={handleLogout}>
                  <EmployeeTaskForm />{" "}
                </ContentWrapper>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
