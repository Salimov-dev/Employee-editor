import React from "react";
// libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
// components
import EmployeesListPage from "./components/page/employeesListPage/employeesListPage";
import EducationEditor from "./components/UI/educationEditor/educationEditor";
import EmployeeEdit from "./components/page/employeeEdit";
import AppLoader from "./components/UI/hoc/appLoader";

function App() {
  return (
    <div className="App container col-5">
      <AppLoader>
        <BrowserRouter>
          <Routes>
            <Route index path="" element={<EmployeesListPage />} />
            <Route path="/employee" element={<EmployeesListPage />} />
            <Route
              path="/employee/:employeeId?/edit"
              element={<EmployeeEdit />}
            />
            <Route path="/educationEditor" element={<EducationEditor />} />
          </Routes>
        </BrowserRouter>
      </AppLoader>
    </div>
  );
}

export default App;
