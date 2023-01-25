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

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="employees">
          <Route index={true} element={<EmployeeList />} />
          <Route path="details/:id" element={<EmployeeDetails />} />
          <Route path="add" element={<EmployeeForm />} />
          <Route path="edit/:id" element={<EmployeeForm />} />
        </Route>
        <Route path="tasks">
          <Route index={true} element={<TaskList />} />
          <Route path="details/:id" element={<TaskDetails />} />
          <Route path="add" element={<TaskForm />} />
          <Route path="edit/:id" element={<TaskForm />} />
        </Route>
        <Route path="employees-tasks">
          <Route index={true} element={<EmployeeTaskList />} />
          <Route path="details/:id" element={<EmployeeTaskDetails />} />
          <Route path="add" element={<EmployeeTaskForm />} />
          <Route path="edit/:id" element={<EmployeeTaskForm />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
